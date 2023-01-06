import { BaseGetManyResponseModel } from "@data/models/response/base-get-many-response";
import { GetPricingsResponseModel } from "@data/models/response/pricing/get-pricings-response";

export const mockedGetPricingsResponse: BaseGetManyResponseModel<GetPricingsResponseModel> =
  {
    data: {
      entries: [
        {
          id: "aP3oq6ex",
          name: "pricings_7pricings_7pricings_7 pricings_7pricings_7",
          minGmv: 450000.0,
          fleetName: "fleets_3",
          slaName: "SLA_TEST_5",
          baseWeightThreshold: 1000.0,
          baseWeightPrice: 400000.0,
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
        },
        {
          id: "wVEAR6y2",
          name: "pricings_6",
          minGmv: 1000000.0,
          fleetName: "fleets_3",
          slaName: "SLA_TEST_5",
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
                    asdjf3ru3: {
                      id: "asdjf3ru3",
                      parentId: "xM6R8j3G",
                      name: "Cicendo",
                      level: "DISTRICT",
                    },
                    lasfjafd8: {
                      id: "lasfjafd8",
                      parentId: "xM6R8j3G",
                      name: "Arjuna",
                      level: "DISTRICT",
                    },
                  },
                },
                slkjf988: {
                  id: "slkjf988",
                  parentId: "xL3do9bn",
                  name: "Bandung",
                  level: "CITY_OR_REGENCY",
                  children: {
                    lasdjf77: {
                      id: "lasdjf77",
                      parentId: "slkjf988",
                      name: "Pasirkaliki",
                      level: "DISTRICT",
                    },
                    xbvmxv23: {
                      id: "xbvmxv23",
                      parentId: "slkjf988",
                      name: "Pajajaran",
                      level: "DISTRICT",
                    },
                    wruwru98: {
                      id: "wruwru98",
                      parentId: "slkjf988",
                      name: "Setraduta",
                      level: "DISTRICT",
                    },
                  },
                },
              },
            },
            hghgjf23: {
              id: "b79wr8w",
              parentId: "hghgjf23",
              name: "Jawa Tengah",
              level: "PROVINCE",
              children: {
                hgrhnp: {
                  id: "ccnfnc33",
                  parentId: "b79wr8w",
                  name: "Semarang",
                  level: "CITY_OR_REGENCY",
                },
              },
            },
          },
        },
      ],
      totalEntries: 29,
      next: "bmV4dF9fXzY",
      previous: "cHJldl9fXzg",
    },
  };
