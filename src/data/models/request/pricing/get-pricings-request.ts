import { BaseGetManyRequestModel } from "../base-get-many-request-model";

export type GetPricingsRequestModel = {
  query?: string;
} & BaseGetManyRequestModel;
