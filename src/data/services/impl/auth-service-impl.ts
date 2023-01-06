import { REQUEST_HEADER_SESSION_KEY } from "@data/consts/request-header";
import { DATA_SERVICE_IDENTIFIER } from "@data/consts/service-identifier";
import { inject, injectable } from "inversify";
import Cookies, { CookieParseOptions } from "universal-cookie";
import { CookieKey } from "../../consts/cookie-key";
import { RestEndpoint } from "../../consts/rest-endpoint";
import { LoginRequestModel } from "../../models/request/auth/login-request";
import { RegisterRequestModel } from "../../models/request/auth/register-request";
import { LoginResponseModel } from "../../models/response/auth/login-response";
import { PermissionsResponseModel } from "../../models/response/auth/permissions-response";
import { BaseErrorModel } from "../../models/response/base-error";
import type { APIService } from "../contracts/api-service";
import { AuthService } from "../contracts/auth-service";

@injectable()
export class AuthServiceImpl implements AuthService {
  private apiService!: APIService;
  private cookies: Cookies;

  constructor(
    @inject(DATA_SERVICE_IDENTIFIER.ApiServiceFactory)
    apiServiceFactory: (baseUrl?: string) => APIService,

    @inject(DATA_SERVICE_IDENTIFIER.CookieFactory)
    cookieFactory: (
      cookies?: string | object | null,
      options?: CookieParseOptions,
    ) => Cookies,
  ) {
    this.apiService = apiServiceFactory(
      process.env.NEXT_PUBLIC_AUTH_SERVICE_BASE_URL,
    );
    this.cookies = cookieFactory();
  }

  async login(
    email: string,
    password: string,
  ): Promise<[LoginResponseModel | null, BaseErrorModel | null]> {
    const request: LoginRequestModel = {
      email: email.trim(),
      password,
    };
    const [result, err] = await this.apiService.post<
      LoginRequestModel,
      LoginResponseModel
    >({ path: RestEndpoint.getPath(RestEndpoint.login), data: request });

    if (err == null && result?.data) {
      const { token } = result.data;
      this.cookies.set(CookieKey.getName(CookieKey.token), token);

      return Promise.resolve([result?.data, null]);
    }
    return Promise.resolve([null, err]);
  }

  async register(
    email: string,
    name: string,
    password: string,
  ): Promise<[null, BaseErrorModel | null]> {
    const request: RegisterRequestModel = {
      email,
      password,
      name,
    };

    const [result, err] = await this.apiService.post<RegisterRequestModel, {}>({
      path: RestEndpoint.getPath(RestEndpoint.register),
      data: request,
      config: {},
    });

    if (err == null && result?.data) {
      return Promise.resolve([null, null]);
    }
    return Promise.resolve([null, err]);
  }

  async logout(): Promise<[null, BaseErrorModel | null]> {
    const token = this.cookies.get(CookieKey.getName(CookieKey.token));

    if (!token) {
      // Automatically logout if token is not exist in cookie
      return Promise.resolve([null, null]);
    }

    const [result, err] = await this.apiService.post<{}, {}>({
      path: RestEndpoint.getPath(RestEndpoint.logout),
    });

    if (err == null && result?.data) {
      this.cookies.remove(CookieKey.getName(CookieKey.token));

      return Promise.resolve([null, null]);
    }
    return Promise.resolve([null, err]);
  }

  async checkSession(token?: string): Promise<[null, BaseErrorModel | null]> {
    const [result, err] = await this.apiService.post<{}, {}>({
      path: RestEndpoint.getPath(RestEndpoint.sessionCheck),
      config: {
        headers: token
          ? {
              [REQUEST_HEADER_SESSION_KEY]: token,
            }
          : {},
      },
    });

    if (err == null && result?.data) {
      return Promise.resolve([null, null]);
    }
    return Promise.resolve([null, err]);
  }

  async getPermissions(): Promise<
    [PermissionsResponseModel | null, BaseErrorModel | null]
  > {
    const path = RestEndpoint.getPath(RestEndpoint.permissions);
    const [result, err] = await this.apiService.get<
      null,
      PermissionsResponseModel
    >({ path });

    if (err == null && result?.data) {
      return Promise.resolve([result?.data, null]);
    }

    return Promise.resolve([null, err]);
  }
}
