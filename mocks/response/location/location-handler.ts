import { RestEndpoint } from "@data/consts/rest-endpoint";
import { BaseResponseModel } from "@data/models/response/base-response";
import { GetLocationsResponseModel } from "@data/models/response/location/get-locations-response";
import { DEFAULT_SERVICE_BASE_URL } from "@mocks/url";
import { RequestHandler, rest } from "msw";
import { mockedGetLocationsResponse } from "./mock-get-locations-response";

export const locationHandlers: RequestHandler[] = [
  rest.get(
    `${DEFAULT_SERVICE_BASE_URL}/${RestEndpoint.getPath(
      RestEndpoint.getLocations,
    )}`,
    (_req, res, ctx) => {
      return res(
        ctx.json<BaseResponseModel<GetLocationsResponseModel>>(
          mockedGetLocationsResponse,
        ),
        ctx.status(200),
      );
    },
  ),
];
