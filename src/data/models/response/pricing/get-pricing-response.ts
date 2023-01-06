import { PricingResponseModel } from "@data/models/shared/pricing-response-model";
import { RegionModel } from "@data/models/shared/region-response-model";

export type GetPricingResponseModel = {
  id: string;
  fleetId: string;
  slaId: string;
  regions?: RegionModel;
} & PricingResponseModel;
