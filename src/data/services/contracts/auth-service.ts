import { BaseErrorModel } from "../../models/response/base-error";
import { LoginResponseModel } from "../../models/response/auth/login-response";
import { PermissionsResponseModel } from "../../models/response/auth/permissions-response";

export interface AuthService {
  login(
    name: string,
    password: string,
  ): Promise<[LoginResponseModel | null, BaseErrorModel | null]>;

  register(
    email: string,
    name: string,
    password: string,
  ): Promise<[null, BaseErrorModel | null]>;

  logout(): Promise<[null, BaseErrorModel | null]>;

  checkSession(token?: string): Promise<[null, BaseErrorModel | null]>;

  getPermissions(): Promise<
    [PermissionsResponseModel | null, BaseErrorModel | null]
  >;
}
