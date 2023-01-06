import { GetPricingsRequestModel } from "@data/models/request/pricing/get-pricings-request";
import { GetPricingResponseModel } from "@data/models/response/pricing/get-pricing-response";
import { GetPricingsResponseModel } from "@data/models/response/pricing/get-pricings-response";
import { toEnumObj } from "@utils/array-to-enum-obj";

export const getPricingsResponseFields: (keyof GetPricingsResponseModel)[] = [
  "additionalDistancePrice",
  "additionalVolumePrice",
  "additionalWeightPrice",
  "baseDistancePrice",
  "baseDistanceThreshold",
  "baseVolumePrice",
  "baseVolumeThreshold",
  "baseWeightPrice",
  "baseWeightThreshold",
  "fleetName",
  "id",
  "isActive",
  "level",
  "maxDistance",
  "minGmv",
  "name",
  "regions",
  "slaName",
];

export const getPricingsResponseEnum = toEnumObj(getPricingsResponseFields);

export const getPricingsRequestFields: (keyof GetPricingsRequestModel)[] = [
  "query",
];

export const getPricingsRequestEnum = toEnumObj(getPricingsRequestFields);

export const getPricingResponseFields: (keyof GetPricingResponseModel)[] = [
  "name",
  "minGmv",
  "fleetId",
  "slaId",
  "baseWeightThreshold",
  "baseWeightPrice",
  "additionalWeightPrice",
  "baseVolumeThreshold",
  "baseVolumePrice",
  "additionalVolumePrice",
  "baseDistanceThreshold",
  "maxDistance",
  "baseDistancePrice",
  "additionalDistancePrice",
  "level",
  "regions",
  "isActive",
];

export const getPricingResponseEnum = toEnumObj(getPricingResponseFields);

export enum DISTANCE_LEVEL {
  REGIONAL = "REGIONAL",
  NATIONAL = "NATIONAL",
}
