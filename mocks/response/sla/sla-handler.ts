import { RestEndpoint } from "@data/consts/rest-endpoint";
import { BaseResponseModel } from "@data/models/response/base-response";
import { GetSlasCatalogueResponseModel } from "@data/models/response/sla/get-slas-catalogue-response";
import { DEFAULT_SERVICE_BASE_URL } from "@mocks/url";
import { RequestHandler, rest } from "msw";
import { mockedGetSlasCatalogueResponse } from "./mock-get-slas-catalogue-response";

export const slaHandlers: RequestHandler[] = [
  rest.get(
    `${DEFAULT_SERVICE_BASE_URL}/${RestEndpoint.getPath(
      RestEndpoint.getSlasCatalogue,
    )}`,
    (_req, res, ctx) => {
      return res(
        ctx.json<BaseResponseModel<GetSlasCatalogueResponseModel>>(
          mockedGetSlasCatalogueResponse,
        ),
        ctx.status(200),
      );
    },
  ),
];
