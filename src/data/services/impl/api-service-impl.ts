import { AgriakuNetworking } from "@agriaku/networking";
import {
  REQUEST_HEADER_APPLICATION_NAME_KEY,
  REQUEST_HEADER_APPLICATION_NAME_VALUE,
  REQUEST_HEADER_APPLICATION_VERSION_KEY,
  REQUEST_HEADER_PLATFORM_KEY,
  REQUEST_HEADER_PLATFORM_VALUE,
  REQUEST_HEADER_SESSION_KEY,
  REQUEST_HEADER_TIMEZONE_KEY,
} from "@data/consts/request-header";
import { DATA_SERVICE_IDENTIFIER } from "@data/consts/service-identifier";
import { WINDOW_MESSAGE } from "@data/consts/window-message";
import { AxiosError, AxiosResponse } from "axios";
import { inject, injectable } from "inversify";
import Cookies, { CookieParseOptions } from "universal-cookie";
import { CookieKey } from "../../consts/cookie-key";
import { BaseErrorModel } from "../../models/response/base-error";
import { BaseResponseModel } from "../../models/response/base-response";
import { APIService, APIServiceRestParams } from "../contracts/api-service";

@injectable()
export class APIServiceImpl implements APIService {
  private http: AgriakuNetworking;
  private cookies: Cookies;

  constructor(
    @inject(DATA_SERVICE_IDENTIFIER.CookieFactory)
    cookieFactory: (
      cookies?: string | object | null,
      options?: CookieParseOptions,
    ) => Cookies,
    baseUrl?: string,
  ) {
    this.http = new AgriakuNetworking();
    this.cookies = cookieFactory();

    this.init(baseUrl);
  }

  init(baseUrl?: string) {
    this.http.setBaseURL(
      baseUrl ?? process.env.NEXT_PUBLIC_DEFAULT_SERVICE_BASE_URL,
    );
    this.http.setCommonHeaders({
      [REQUEST_HEADER_APPLICATION_NAME_KEY]:
        REQUEST_HEADER_APPLICATION_NAME_VALUE,
      [REQUEST_HEADER_APPLICATION_VERSION_KEY]:
        process.env.NEXT_PUBLIC_WEB_VERSION,
      [REQUEST_HEADER_PLATFORM_KEY]: REQUEST_HEADER_PLATFORM_VALUE,
      [REQUEST_HEADER_TIMEZONE_KEY]: this.getTimezoneString(),
    });
    this.http.setRequestInterceptor((config) => {
      const token = this.cookies.get(CookieKey.getName(CookieKey.token));

      if (config?.headers && token) {
        config.headers = {
          ...config.headers,
          ...(token && { [REQUEST_HEADER_SESSION_KEY]: token }),
        };
      }
    });
  }

  setBaseURL(baseURL: string) {
    this.http.setBaseURL(baseURL);
  }

  getHttpClient(): AgriakuNetworking {
    return this.http;
  }

  async post<Request, Response>({
    path,
    data,
    config,
  }: APIServiceRestParams<Request>): Promise<
    [BaseResponseModel<Response> | null, BaseErrorModel | null]
  > {
    const [response, err] = await this.http.post<
      Request,
      BaseResponseModel<Response>
    >(path, data, config);

    return this.execute<Response>(response, err);
  }

  async get<Request, Response>({
    path,
    data,
    config,
  }: APIServiceRestParams<Request>): Promise<
    [BaseResponseModel<Response> | null, BaseErrorModel | null]
  > {
    const [response, err] = await this.http.get<
      Request,
      BaseResponseModel<Response>
    >(path, data, config);

    return this.execute<Response>(response, err);
  }

  async put<Request, Response>({
    path,
    data,
    config,
  }: APIServiceRestParams<Request>): Promise<
    [BaseResponseModel<Response> | null, BaseErrorModel | null]
  > {
    const [response, err] = await this.http.put<
      Request,
      BaseResponseModel<Response>
    >(path, data, config);

    return this.execute<Response>(response, err);
  }

  async delete<Request, Response>({
    path,
    data,
    config,
  }: APIServiceRestParams<Request>): Promise<
    [BaseResponseModel<Response> | null, BaseErrorModel | null]
  > {
    const [response, err] = await this.http.delete<
      Request,
      BaseResponseModel<Response>
    >(path, data, config);

    return this.execute<Response>(response, err);
  }

  private async execute<Response>(
    response: AxiosResponse<BaseResponseModel<Response>> | null,
    error: AxiosError<BaseResponseModel<Response>> | null,
  ): Promise<[BaseResponseModel<Response> | null, BaseErrorModel | null]> {
    if (response?.status === 401 || response?.status === 403) {
      this.cookies.remove(CookieKey.getName(CookieKey.token));
    }

    // You may handle error for specific error codes here
    if (error === null && response) {
      return Promise.resolve([response.data, null]);
    }

    const err: BaseErrorModel = {
      status: error?.response?.status || 500,
      errorCode: error?.response?.data.errorCode,
    };

    if (error) {
      if (error.response?.status === 401) {
        if (typeof window !== "undefined") {
          window.postMessage(WINDOW_MESSAGE.UNAUTHORIZED, window.parent.origin);
        }
        this.cookies.remove(CookieKey.getName(CookieKey.token));
      }
    }

    return Promise.resolve([error?.response?.data || null, err]);
  }

  private getTimezoneString(): string {
    const d = new Date();
    const offset = d.getTimezoneOffset();

    // Negative value means local timezone is ahead UTC
    // Positive value means local timezone is behind UTC
    const sign = offset < 0 ? "+" : "-";

    const h = Math.floor(Math.abs(offset / 60));
    const m = Math.abs(offset) % 60;

    const hh = h < 10 ? `0${h.toString()}` : h.toString();
    const mm = m < 10 ? `0${m.toString()}` : m.toString();

    return `${sign}${hh}:${mm}`;
  }
}
