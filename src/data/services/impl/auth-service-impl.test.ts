import { DATA_SERVICE_IDENTIFIER } from "@data/consts/service-identifier";
import { rootContainer } from "@src/root-container";
import { AuthService } from "../contracts/auth-service";

const authService = rootContainer.get<AuthService>(
  DATA_SERVICE_IDENTIFIER.AuthService,
);

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

describe("Login", () => {
  test("User can login", async () => {
    const [response, _err] = await authService.login(username!, password!);
    expect(response).toHaveProperty("token");
  });

  test("User can logout", async () => {
    const [response, _err] = await authService.logout();
    expect(response).toBe(null);
  });

  test("Wrong username or password", async () => {
    const [response, err] = await authService.login(username!, "something");
    expect(response).toBeNull();
    expect(err).toMatchObject({
      status: 401,
      errorCode: "INVALID_EMAIL_OR_PASSWORD",
    });

    await authService.logout();
  });
});
