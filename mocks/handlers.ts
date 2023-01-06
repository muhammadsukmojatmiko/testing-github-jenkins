import { fleetHandlers } from "./response/fleet/fleet-handler";
import { locationHandlers } from "./response/location/location-handler";
import { pricingHandlers } from "./response/pricing/pricing-handler";
import { slaHandlers } from "./response/sla/sla-handler";

export const handlers = [
  ...locationHandlers,
  ...pricingHandlers,
  ...fleetHandlers,
  ...slaHandlers,
];
