import { RestEndpoint } from "@data/consts/rest-endpoint";
import { BaseErrorModel } from "@data/models/response/base-error";
import { BaseResponseModel } from "@data/models/response/base-response";
import { GetLocationsResponseModel } from "@data/models/response/location/get-locations-response";
import { CustomResponse, HttpError, useCustom } from "@pankod/refine-core";
import { UseQueryResult } from "@tanstack/react-query";

export function useGetLocations(
  parentId: string = "",
  queryOptions = {},
  metaData = {},
): UseQueryResult<
  CustomResponse<BaseResponseModel<GetLocationsResponseModel>>,
  BaseErrorModel | HttpError
> {
  const result = useCustom<BaseResponseModel<GetLocationsResponseModel>>({
    url: `${
      process.env.NEXT_PUBLIC_DEFAULT_SERVICE_BASE_URL
    }/${RestEndpoint.getPath(RestEndpoint.getLocations)}?parentId=${parentId}`,
    method: "get",
    queryOptions: {
      ...queryOptions,
    },
    metaData,
  });
  return result;
}
