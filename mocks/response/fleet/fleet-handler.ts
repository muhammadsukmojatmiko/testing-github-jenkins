import { RestEndpoint } from "@data/consts/rest-endpoint";
import { BaseResponseModel } from "@data/models/response/base-response";
import { GetFleetsCatalogueResponseModel } from "@data/models/response/fleet/get-fleets-catalogue-response";
import { DEFAULT_SERVICE_BASE_URL } from "@mocks/url";
import { RequestHandler, rest } from "msw";
import { mockedGetFleetsCatalogueResponse } from "./mock-get-fleets-catalogue-response";

export const fleetHandlers: RequestHandler[] = [
  rest.get(
    `${DEFAULT_SERVICE_BASE_URL}/${RestEndpoint.getPath(
      RestEndpoint.getFleetsCatalogue,
    )}`,
    (_req, res, ctx) => {
      return res(
        ctx.json<BaseResponseModel<GetFleetsCatalogueResponseModel>>(
          mockedGetFleetsCatalogueResponse,
        ),
        ctx.status(200),
      );
    },
  ),
];
