import { BaseResponseModel } from "@data/models/response/base-response";
import { GetPricingResponseModel } from "@data/models/response/pricing/get-pricing-response";

export const mockedGetPricingResponse: BaseResponseModel<GetPricingResponseModel> =
  {
    data: {
      id: "nL3YNEGZ",
      name: "pricings_1",
      minGmv: 500000.0,
      fleetId: "zp3w0Eav",
      slaId: "nL3YNEGZ",
      baseWeightThreshold: 1000.0,
      baseWeightPrice: 10000.0,
      additionalWeightPrice: 100.0,
      baseVolumeThreshold: 1000.0,
      baseVolumePrice: 10000.0,
      additionalVolumePrice: 100.0,
      maxDistance: 100000.0,
      baseDistanceThreshold: 10000.0,
      baseDistancePrice: 10000.0,
      additionalDistancePrice: 100.0,
      level: "REGIONAL",
      isActive: true,
      regions: {
        xL3do9bn: {
          id: "xL3do9bn",
          parentId: "nL3YNEGZ",
          name: "Aceh",
          level: "PROVINCE",
          children: {
            xM6R8j3G: {
              id: "xM6R8j3G",
              parentId: "xL3do9bn",
              name: "Aceh Tenggara",
              level: "CITY_OR_REGENCY",
              children: {
                jV645q9e: {
                  id: "jV645q9e",
                  parentId: "xM6R8j3G",
                  name: "Bambel",
                  level: "DISTRICT",
                },
              },
            },
          },
        },
      },
    },
  };
