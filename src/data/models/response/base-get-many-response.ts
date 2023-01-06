import { BaseResponseModel } from "./base-response";

export type BaseGetManyResponseModel<T> = BaseResponseModel<{
  entries: T[];
  totalEntries: number;
  next: string;
  previous: string;
}>;
