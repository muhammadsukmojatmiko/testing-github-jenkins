import { GetListResponse } from "@pankod/refine-core";

export type DataProviderGetListResponseModel<T> = GetListResponse<T> & {
  next: string;
  previous: string;
};
