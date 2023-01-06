import { AgriakuNetworking } from "@agriaku/networking";
import { AxiosRequestConfig } from "axios";
import { BaseErrorModel } from "../../models/response/base-error";
import { BaseResponseModel } from "../../models/response/base-response";

export type APIServiceRestParams<T> = {
  path: string;
  data?: T;
  config?: AxiosRequestConfig;
};

export interface APIService {
  init(): void;

  setBaseURL(baseURL: string): void;

  getHttpClient(): AgriakuNetworking;

  post<Request, Response>(
    params: APIServiceRestParams<Request>,
  ): Promise<[BaseResponseModel<Response> | null, BaseErrorModel | null]>;

  get<Request, Response>(
    params: APIServiceRestParams<Request>,
  ): Promise<[BaseResponseModel<Response> | null, BaseErrorModel | null]>;

  put<Request, Response>(
    params: APIServiceRestParams<Request>,
  ): Promise<[BaseResponseModel<Response> | null, BaseErrorModel | null]>;

  delete<Request, Response>(
    params: APIServiceRestParams<Request>,
  ): Promise<[BaseResponseModel<Response> | null, BaseErrorModel | null]>;
}
