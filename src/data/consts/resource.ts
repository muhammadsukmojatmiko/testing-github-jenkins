import { RestEndpoint } from "./rest-endpoint";

export enum DashboardResource {
  masterConfiguration = "masterConfiguration",
  pricing = "pricing",
  sla = "sla",
  fleet = "fleet",
  slasCatalogue = "slasCatalogue",
  fleetsCatalogue = "fleetsCatalogue",
  location = "location",
}

export namespace DashboardResource {
  export function getListPath(type: DashboardResource): string {
    switch (type) {
      case DashboardResource.pricing:
        return RestEndpoint.getPath(RestEndpoint.getPricings);
      case DashboardResource.slasCatalogue:
        return RestEndpoint.getPath(RestEndpoint.getSlasCatalogue);
      case DashboardResource.fleetsCatalogue:
        return RestEndpoint.getPath(RestEndpoint.getFleetsCatalogue);
      case DashboardResource.location:
        return RestEndpoint.getPath(RestEndpoint.getLocations);
      default:
        return "";
    }
  }

  export function getDetailPath(type: DashboardResource): string {
    switch (type) {
      case DashboardResource.pricing:
        return RestEndpoint.getPath(RestEndpoint.getPricing);

      case DashboardResource.sla:
        return RestEndpoint.getPath(RestEndpoint.getSla);
      case DashboardResource.fleet:
        return RestEndpoint.getPath(RestEndpoint.getFleet);
      default:
        return "";
    }
  }

  export function getCreatePath(type: DashboardResource): string {
    switch (type) {
      case DashboardResource.pricing:
        return RestEndpoint.getPath(RestEndpoint.createPricing);
      default:
        return "";
    }
  }

  export function getUpdatePath(type: DashboardResource): string {
    switch (type) {
      case DashboardResource.pricing:
        return RestEndpoint.getPath(RestEndpoint.updatePricing);
      default:
        return "";
    }
  }

  export function getDeletePath(type: DashboardResource): string {
    switch (type) {
      default:
        return "";
    }
  }

  export function getDeleteManyPath(type: DashboardResource): string {
    switch (type) {
      case DashboardResource.pricing:
        return RestEndpoint.getPath(RestEndpoint.bulkDeletePricing);
      default:
        return "";
    }
  }

  export function getName(type: DashboardResource): string {
    return DashboardResource[type];
  }

  export function resolve(resource: string): DashboardResource {
    return (<any>DashboardResource)[resource];
  }
  export function getLabel(type: DashboardResource): string {
    switch (type) {
      case DashboardResource.masterConfiguration:
        return "Konfigurasi";
      case DashboardResource.pricing:
        return "Harga";
      case DashboardResource.fleet:
        return "Kendaraan";
      default:
        return "";
    }
  }
}
