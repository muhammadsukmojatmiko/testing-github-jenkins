import { PricingResponseModel } from "@data/models/shared/pricing-response-model";
import { RegionModel } from "@data/models/shared/region-response-model";

export type GetPricingsResponseModel = {
  id: string;
  fleetName: string;
  slaName: string;
  regions?: RegionModel;
} & PricingResponseModel;
