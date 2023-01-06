import { API_SERVICE_TYPE } from "./api-service-type";

type ResourceServiceMappingType = {
  resources: string[];
  apiServiceType: API_SERVICE_TYPE;
  baseUrl: string;
};

// List of all tuples between resources and the corresponding service
// This is useful when the application has multiple services
// which use different base URLs than the primary service's
export const resourceServiceMapping: ResourceServiceMappingType[] = [
  // {
  //   resources: [DashboardResource.other_resource],
  //   apiServiceKey: API_SERVICE_TYPE.OTHER_SERVICE,
  // },
];
