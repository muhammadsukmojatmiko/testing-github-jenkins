import { DashboardResource } from "@data/consts/resource";

const fieldSelector = {
  [DashboardResource.getName(DashboardResource.slasCatalogue)]: "catalogues",
  [DashboardResource.getName(DashboardResource.fleetsCatalogue)]: "catalogues",
  [DashboardResource.getName(DashboardResource.location)]: "results",
};

export const getManyFieldSelectorResolver = (resource: string): string => {
  return fieldSelector[resource] ?? "entries";
};
