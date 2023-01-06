import { BaseResponseModel } from "@data/models/response/base-response";
import { GetSlasCatalogueResponseModel } from "@data/models/response/sla/get-slas-catalogue-response";

export const mockedGetSlasCatalogueResponse: BaseResponseModel<GetSlasCatalogueResponseModel> =
  {
    data: {
      catalogues: [
        {
          id: "nL3YNEGZ",
          name: "SLA_TEST_!",
        },
        {
          id: "Zv9kQEM7",
          name: "SLA_TEST_10",
        },
        {
          id: "xL3do9bn",
          name: "SLA_TEST_2",
        },
        {
          id: "zp3w0Eav",
          name: "SLA_TEST_3",
        },
        {
          id: "jV64X6eA",
          name: "SLA_TEST_4",
        },
        {
          id: "oBErK6Gy",
          name: "SLA_TEST_5",
        },
        {
          id: "wVEAR6y2",
          name: "SLA_TEST_6",
        },
        {
          id: "aP3oq6ex",
          name: "SLA_TEST_7",
        },
        {
          id: "vxEKD6Vl",
          name: "SLA_TEST_8",
        },
        {
          id: "bOEJO6rn",
          name: "SLA_TEST_9",
        },
      ],
    },
  };
