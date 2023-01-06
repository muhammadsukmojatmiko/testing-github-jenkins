import { ResponseErrorCode } from "../../consts/response-error-code";

export type BaseErrorModel = {
  status: number;
  errorCode?: ResponseErrorCode;
  errorMessage?: string;
};
