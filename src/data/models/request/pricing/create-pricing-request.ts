import { PricingResponseModel } from "@data/models/shared/pricing-response-model";

export type CreatePricingRequestModel = {
  fleetId: string;
  slaId: string;
  regions: string[]; // DISTRICT level
} & PricingResponseModel;
