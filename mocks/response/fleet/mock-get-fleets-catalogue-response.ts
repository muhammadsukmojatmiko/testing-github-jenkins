import { BaseResponseModel } from "@data/models/response/base-response";
import { GetFleetsCatalogueResponseModel } from "@data/models/response/fleet/get-fleets-catalogue-response";

export const mockedGetFleetsCatalogueResponse: BaseResponseModel<GetFleetsCatalogueResponseModel> =
  {
    data: {
      catalogues: [
        {
          id: "nL3YNEGZ",
          name: "fleets_1",
        },
        {
          id: "xL3do9bn",
          name: "fleets_2",
        },
        {
          id: "zp3w0Eav",
          name: "fleets_3",
        },
        {
          id: "jV64X6eA",
          name: "fleets_4",
        },
        {
          id: "oBErK6Gy",
          name: "fleets_5",
        },
        {
          id: "wVEAR6y2",
          name: "fleets_6",
        },
      ],
    },
  };
