export type PricingResponseModel = {
  name: string;
  minGmv: number;
  baseWeightThreshold: number;
  baseWeightPrice: number;
  additionalWeightPrice: number;
  baseVolumeThreshold: number;
  baseVolumePrice: number;
  additionalVolumePrice: number;
  maxDistance: number;
  baseDistanceThreshold: number;
  baseDistancePrice: number;
  additionalDistancePrice: number;
  level: "REGIONAL" | "NATIONAL";
  isActive: boolean;
};
