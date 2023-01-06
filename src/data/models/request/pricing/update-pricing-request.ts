import { PricingResponseModel } from "@data/models/shared/pricing-response-model";

export type UpdatePricingRequestModel = {
  fleetId: string;
  slaId: string;
  regions: string[]; // DISTRICT level
} & PricingResponseModel;
