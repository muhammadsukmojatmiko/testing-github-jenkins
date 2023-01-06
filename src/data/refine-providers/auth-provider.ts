import { AuthProvider } from "@pankod/refine-core";
import Cookies from "universal-cookie";
import { CookieKey } from "../consts/cookie-key";

import { DATA_SERVICE_IDENTIFIER } from "@data/consts/service-identifier";
import type { AuthService } from "@data/services/contracts/auth-service";

import { bindDependencies } from "@src/utils/bind-dependencies";
import { interfaces } from "inversify";

function makeAuthProvider(
  authService: AuthService,
  cookieFactory: interfaces.AutoFactory<Cookies>,
): AuthProvider {
  const cookies = cookieFactory();

  return {
    login: async ({
      email,
      password,
    }: Parameters<AuthProvider["login"]>[0]) => {
      const [response, err] = await authService.login(email, password);

      if (response !== null) {
        const { token } = response;
        if (token) {
          return Promise.resolve();
        }
      }
      return Promise.reject(err);
    },

    logout: async () => {
      if (!cookies.get(CookieKey.getName(CookieKey.token))) {
        return Promise.resolve();
      }

      const [response, err] = await authService.logout();
      if (err === null) {
        return Promise.resolve();
      }
      return Promise.reject();
    },

    checkError: async ({
      status,
    }: Parameters<AuthProvider["checkError"]>[0]) => {
      return Promise.resolve();
    },

    checkAuth: async (ctx: Parameters<AuthProvider["checkAuth"]>[0]) => {
      const cookieStr = ctx?.req?.headers?.cookie;

      let cookies = null;
      if (cookieStr) {
        // TODO: fix typing
        // @ts-ignore
        cookies = cookieFactory(cookieStr);
      }

      const [response, err] = await authService.checkSession(
        cookies ? cookies.get(CookieKey.getName(CookieKey.token)) : "",
      );

      if (err === null) {
        return Promise.resolve();
      }

      return Promise.reject();
    },

    getPermissions: async () => {
      const [response, err] = await authService.getPermissions();
      if (err == null) {
        return Promise.resolve(response);
      }
      return Promise.reject();
    },
  };
}

const getAuthProvider = bindDependencies(makeAuthProvider, [
  { identifier: DATA_SERVICE_IDENTIFIER.AuthService },
  { identifier: DATA_SERVICE_IDENTIFIER.CookieFactory },
]);

export { getAuthProvider };
