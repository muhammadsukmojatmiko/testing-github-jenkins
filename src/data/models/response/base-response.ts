import { ResponseErrorCode } from "../../consts/response-error-code";

export type BaseResponseModel<T> = {
  data?: T;
  errorCode?: ResponseErrorCode;
};
