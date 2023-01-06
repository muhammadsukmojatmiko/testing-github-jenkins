import { RestEndpoint } from "@data/consts/rest-endpoint";
import { BaseGetManyResponseModel } from "@data/models/response/base-get-many-response";
import { BaseResponseModel } from "@data/models/response/base-response";
import { BulkDeleteResponseModel } from "@data/models/response/pricing/bulk-delete-response";
import { CreatePricingResponseModel } from "@data/models/response/pricing/create-pricing-response";
import { GetPricingResponseModel } from "@data/models/response/pricing/get-pricing-response";
import { GetPricingsResponseModel } from "@data/models/response/pricing/get-pricings-response";
import { ToggleActivePricingResponseModel } from "@data/models/response/pricing/toggle-active-pricint.response";
import { UpdatePricingResponseModel } from "@data/models/response/pricing/update-pricing-response";
import { DEFAULT_SERVICE_BASE_URL } from "@mocks/url";
import { generateGetMany } from "@mocks/utils/generate-get-many";
import { RequestHandler, rest } from "msw";
import { mockedBulkDeletePricingResponse } from "./mock-bulk-delete-pricing-response";
import { mockedCreatePricingResponse } from "./mock-create-pricing-response";
import { mockedGetPricingResponse } from "./mock-get-pricing-response";
import { mockedGetPricingsResponse } from "./mock-get-pricings-response";
import { mockedToggleActivePricingResponse } from "./mock-toggle-active-pricing-response";
import { mockedUpdatePricingResponse } from "./mock-update-pricing-response";

export const pricingHandlers: RequestHandler[] = [
  rest.get(
    `${DEFAULT_SERVICE_BASE_URL}/${RestEndpoint.getPath(
      RestEndpoint.getPricings,
    )}`,
    (_req, res, ctx) => {
      return res(
        ctx.json<BaseGetManyResponseModel<GetPricingsResponseModel>>(
          generateGetMany(mockedGetPricingsResponse, 5, 30),
        ),
        ctx.status(200),
      );
    },
  ),
  rest.post(
    `${DEFAULT_SERVICE_BASE_URL}/${RestEndpoint.getPath(
      RestEndpoint.bulkDeletePricing,
    )}`,
    (_req, res, ctx) => {
      return res(
        ctx.json<BaseResponseModel<BulkDeleteResponseModel>>(
          mockedBulkDeletePricingResponse,
        ),
        ctx.status(200),
      );
    },
  ),
  rest.get(
    `${DEFAULT_SERVICE_BASE_URL}/${RestEndpoint.getPath(
      RestEndpoint.getPricing,
    )}`,
    (_req, res, ctx) => {
      return res(
        ctx.json<BaseResponseModel<GetPricingResponseModel>>(
          mockedGetPricingResponse,
        ),
        ctx.status(200),
      );
    },
  ),
  rest.post(
    `${DEFAULT_SERVICE_BASE_URL}/${RestEndpoint.getPath(
      RestEndpoint.createPricing,
    )}`,
    (_req, res, ctx) => {
      return res(
        ctx.json<BaseResponseModel<CreatePricingResponseModel>>(
          mockedCreatePricingResponse,
        ),
        ctx.status(200),
      );
    },
  ),
  rest.put(
    `${DEFAULT_SERVICE_BASE_URL}/${RestEndpoint.getPath(
      RestEndpoint.updatePricing,
    )}`,
    (_req, res, ctx) => {
      return res(
        ctx.json<BaseResponseModel<UpdatePricingResponseModel>>(
          mockedUpdatePricingResponse,
        ),
        ctx.status(200),
      );
    },
  ),
  rest.post(
    `${DEFAULT_SERVICE_BASE_URL}/${RestEndpoint.getPath(
      RestEndpoint.toggleActivePricing,
    )}`,
    (_req, res, ctx) => {
      return res(
        ctx.json<BaseResponseModel<ToggleActivePricingResponseModel>>(
          mockedToggleActivePricingResponse,
        ),
        ctx.status(200),
      );
    },
  ),
];
