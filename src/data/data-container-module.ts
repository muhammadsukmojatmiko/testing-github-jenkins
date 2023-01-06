import { ContainerModule, interfaces } from "inversify";
import Cookies, { CookieParseOptions } from "universal-cookie";
import { DATA_SERVICE_IDENTIFIER } from "./consts/service-identifier";
import { APIService } from "./services/contracts/api-service";
import { AuthService } from "./services/contracts/auth-service";
import { APIServiceImpl } from "./services/impl/api-service-impl";
import { AuthServiceImpl } from "./services/impl/auth-service-impl";

let dataContainerModule = new ContainerModule((bind) => {
  bind<AuthService>(DATA_SERVICE_IDENTIFIER.AuthService).to(AuthServiceImpl);

  bind<interfaces.Factory<Cookies>>(
    DATA_SERVICE_IDENTIFIER.CookieFactory,
  ).toFactory<Cookies, []>((context: interfaces.Context) => {
    return (cookies?: string | object | null, options?: CookieParseOptions) => {
      return new Cookies(cookies, options);
    };
  });

  bind<interfaces.Factory<APIService>>(
    DATA_SERVICE_IDENTIFIER.ApiServiceFactory,
  ).toFactory<APIService, []>((context: interfaces.Context) => {
    return (baseUrl?: string) => {
      return new APIServiceImpl(
        context.container.get(DATA_SERVICE_IDENTIFIER.CookieFactory),
        baseUrl,
      );
    };
  });
});

export { dataContainerModule };
