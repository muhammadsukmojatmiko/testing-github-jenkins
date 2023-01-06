import { BaseResponseModel } from "@data/models/response/base-response";
import { BulkDeleteResponseModel } from "@data/models/response/pricing/bulk-delete-response";

export const mockedBulkDeletePricingResponse: BaseResponseModel<BulkDeleteResponseModel> =
  {
    data: {
      success: true,
    },
  };
