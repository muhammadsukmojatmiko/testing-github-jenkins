import { resourceServiceMapping } from "@data/consts/resource-service-mapping";
import { DATA_SERVICE_IDENTIFIER } from "@data/consts/service-identifier";
import { BaseGetManyRequestModel } from "@data/models/request/base-get-many-request-model";
import { APIService } from "@data/services/contracts/api-service";
import { getManyFieldSelectorResolver } from "@data/utils/get-many-field-selector-resolver";
import { DataProvider } from "@pankod/refine-core";
import { bindDependencies } from "@utils/bind-dependencies";
import { API_SERVICE_TYPE } from "../consts/api-service-type";
import { DashboardResource } from "../consts/resource";

const DEFAULT_API_SERVICE_KEY = "default";
function makeDataProvider(
  apiServiceFactory: (baseUrl?: string) => APIService,
): DataProvider {
  // key is unique service base URL
  const apiServiceContainer = new Map<string, APIService>();
  apiServiceContainer.set(DEFAULT_API_SERVICE_KEY, apiServiceFactory());

  const resolveBaseUrlByResource = (resource: string): APIService => {
    const resourceService = resourceServiceMapping.find((e) =>
      e.resources.find((r) => r === resource),
    );
    return getApiService(resourceService?.baseUrl);
  };

  const resolveBaseUrlByServiceType = (
    serviceType?: API_SERVICE_TYPE,
  ): APIService => {
    const resourceService = resourceServiceMapping.find(
      (e) => e.apiServiceType === serviceType,
    );
    return getApiService(resourceService?.baseUrl);
  };

  const getApiService = (key?: string): APIService => {
    if (key) {
      if (apiServiceContainer.has(key)) {
        apiServiceContainer.set(key, apiServiceFactory(key));
      }
      return apiServiceContainer.get(key)!;
    }
    return apiServiceContainer.get(DEFAULT_API_SERVICE_KEY)!;
  };

  return {
    getList: async ({
      resource,
      dataProviderName,
      filters = [],
      hasPagination,
      metaData = {},
      pagination,
      sort = [],
    }: Parameters<DataProvider["getList"]>[0]) => {
      const apiService = resolveBaseUrlByResource(resource);

      const { headers = {}, ...restMetadata } = metaData;
      const path = DashboardResource.getListPath(
        DashboardResource.resolve(resource),
      );

      const filtersObj = filters
        // @ts-expect-error
        .filter((e) => Boolean(e.field))
        .reduce((prev, curr) => {
          return {
            ...prev,
            // @ts-expect-error
            [curr?.field]: curr.value,
          };
        }, {});

      // assuming our pagination system use page index and not page number
      if (metaData.pageIndex !== "undefined") {
        const [response, error] = await apiService.get<
          BaseGetManyRequestModel,
          any
        >({
          path,
          data: {
            page: filters.length === 0 ? metaData.pageIndex : "",
            limit: metaData.pageSize ?? pagination?.pageSize ?? 10,
            ...filtersObj,
          },
          config: {
            headers,
          },
        });

        if (error) {
          return Promise.reject(error);
        }

        try {
          const data = (response?.data as any) ?? {};
          return Promise.resolve({
            data: data?.[getManyFieldSelectorResolver(resource)] ?? [],
            total:
              data?.totalEntries ??
              data?.[getManyFieldSelectorResolver(resource)]?.length ??
              0,
            next: data?.next ?? "",
            previous: data?.previous ?? "",
          });
        } catch (error) {
          return Promise.reject(error);
        }
      }

      return Promise.reject();
    },

    getOne: async ({
      resource,
      id,
      metaData = {},
    }: Parameters<DataProvider["getOne"]>[0]) => {
      const apiService = resolveBaseUrlByResource(resource);

      const { headers = {}, ...restMetadata } = metaData;
      const path = DashboardResource.getDetailPath(
        DashboardResource.resolve(resource),
      );
      const [response, error] = await apiService.get({
        path: `${path}/${encodeURIComponent(id)}`,
        config: {
          headers,
        },
      });

      return Promise.resolve({
        data: (response?.data as any) || {},
      });
    },

    create: async ({
      resource,
      variables,
      metaData = {},
    }: Parameters<DataProvider["create"]>[0]) => {
      const apiService = resolveBaseUrlByResource(resource);

      const { headers = {}, ...restMetadata } = metaData;
      const path = DashboardResource.getCreatePath(
        DashboardResource.resolve(resource),
      );
      const [response, error] = await apiService.post({
        path,
        data: variables,
        config: {
          headers,
        },
      });

      if (error) {
        return Promise.reject(error);
      }

      return Promise.resolve({
        data: {
          id: (response?.data as any)?.id ?? "",
        } as any,
      });
    },

    update: async ({
      resource,
      id,
      variables,
      metaData = {},
    }: Parameters<DataProvider["update"]>[0]) => {
      const apiService = resolveBaseUrlByResource(resource);

      const { headers = {}, ...restMetadata } = metaData;
      const path = DashboardResource.getUpdatePath(
        DashboardResource.resolve(resource),
      );
      const [response, error] = await apiService.put({
        path: `${path}/${id}`,
        data: variables,
        config: {
          headers,
        },
      });

      if (error) {
        return Promise.reject(error);
      }

      return Promise.resolve({
        data: (response?.data as any) ?? null,
      });
    },

    deleteOne: async ({
      resource,
      id,
      metaData = {},
      variables,
    }: Parameters<DataProvider["deleteOne"]>[0]) => {
      const apiService = resolveBaseUrlByResource(resource);

      const { headers = {}, ...restMetadata } = metaData;
      const path = DashboardResource.getDeletePath(
        DashboardResource.resolve(resource),
      );
      const [response, error] = await apiService.delete({
        path: `${path}/${id}`,
      });

      return Promise.resolve({
        data: (response?.data as any) ?? null,
        config: {
          headers,
        },
      });
    },

    deleteMany: async ({
      resource,
      ids,
      metaData = {},
      variables,
    }: Parameters<DataProvider["deleteMany"]>[0]) => {
      const apiService = resolveBaseUrlByResource(resource);

      const { headers = {}, ...restMetadata } = metaData;
      const path = DashboardResource.getDeleteManyPath(
        DashboardResource.resolve(resource),
      );

      const [response, error] = await apiService.post({
        path: `${path}`,
        data: { ids },
      });

      return Promise.resolve({
        data: (response?.data as any) ?? null,
        config: {
          headers,
        },
      });
    },

    // To pass `apiServiceType` param, pass it from `config` if you use refine `useCustom`
    // For example: useCustom({ config: { apiServiceType: API_SERVICE_TYPE.DEFAULT } })
    custom: async ({
      url,
      method,
      filters,
      sort,
      payload,
      query,
      headers,
      apiServiceType,
    }: Parameters<NonNullable<DataProvider["custom"]>>[0] & {
      apiServiceType?: API_SERVICE_TYPE;
    }) => {
      const apiService = resolveBaseUrlByServiceType(apiServiceType);

      // Was taken from APIService's method
      let restMethodAccessor: "get" | "post" | "put" | "delete" | "" = "";

      switch (method) {
        case "put":
          restMethodAccessor = "put";
          break;
        case "post":
          restMethodAccessor = "post";
          break;
        case "delete":
          restMethodAccessor = "delete";
          break;
        case "get":
          restMethodAccessor = "get";
          break;
        default:
          restMethodAccessor = "";
          break;
      }

      if (restMethodAccessor) {
        const [response, error] = await apiService[restMethodAccessor]({
          path: url,
          data: payload,
          config: {
            headers: headers ?? {},
          },
        });

        if (error) {
          return Promise.reject(error);
        }

        return Promise.resolve({ data: response as any });
      }

      return Promise.reject(
        "Custom REST method is not supported yet, please implement it in API service and modify the code in refine data provider custom method",
      );
    },

    // Need to add implementation detail for the below methods
    // when it is needed

    createMany: async ({
      resource,
      variables,
      metaData,
    }: Parameters<DataProvider["createMany"]>[0]) => {
      return {
        data: {} as any,
      };
    },

    getMany: async ({
      resource,
      metaData,
      ids,
      dataProviderName,
    }: Parameters<DataProvider["getMany"]>[0]) => {
      return {
        data: {} as any,
      };
    },

    updateMany: async ({
      resource,
      variables,
      metaData,
    }: Parameters<DataProvider["updateMany"]>[0]) => {
      return {
        data: {} as any,
      };
    },

    getApiUrl: () => {
      return "";
    },
  };
}

const getDataProvider = bindDependencies(makeDataProvider, [
  { identifier: DATA_SERVICE_IDENTIFIER.ApiServiceFactory },
]);

export { getDataProvider };
