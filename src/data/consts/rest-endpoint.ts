export enum RestEndpoint {
  // auth
  login,
  register,
  sessionCheck,
  logout,
  permissions,

  // pricing
  createPricing,
  updatePricing,
  bulkDeletePricing,
  getPricings,
  getPricing,
  toggleActivePricing,

  // location
  getLocations,

  // fleet catalogues
  getFleetsCatalogue,

  //fleet
  getFleet,

  // sla catalogues
  getSlasCatalogue,

  // sla
  getSla,
}

export namespace RestEndpoint {
  export function getPath(type: RestEndpoint, id: string = ""): string {
    switch (type) {
      // auth
      case RestEndpoint.login:
        return "api/v1/auth/login";
      case RestEndpoint.register:
        return "v1/user/register";
      case RestEndpoint.sessionCheck:
        return "api/v1/auth/check";
      case RestEndpoint.logout:
        return "api/v1/auth/logout";
      case RestEndpoint.permissions:
        return "v1/authorized_resources";

      // pricing
      case RestEndpoint.createPricing:
        return "api/internal/pricings";
      case RestEndpoint.updatePricing:
        return "api/internal/pricings";
      case RestEndpoint.bulkDeletePricing:
        return "api/internal/pricings/delete";
      case RestEndpoint.getPricings:
        return "api/internal/pricings";
      case RestEndpoint.getPricing:
        return "api/internal/pricings";
      case RestEndpoint.toggleActivePricing:
        return `api/internal/pricings/${id}/toggle`;

      // location
      case RestEndpoint.getLocations:
        return "api/internal/locations";

      //fleet
      case RestEndpoint.getFleet:
        return `/api/internal/fleets`;

      //sla
      case RestEndpoint.getSla:
        return `/api/internal/slas`;

      // fleet catalogues
      case RestEndpoint.getFleetsCatalogue:
        return "api/internal/fleets/catalogues";

      // sla catalogues
      case RestEndpoint.getSlasCatalogue:
        return "api/internal/slas/catalogues";

      default:
        return "";
    }
  }
}
