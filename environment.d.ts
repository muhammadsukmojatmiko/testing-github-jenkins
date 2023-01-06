namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_USE_MOCK_DATA: "true" | "false" | undefined;
    NEXT_PUBLIC_TARGET_ENV: "development" | "staging" | "production";
    NEXT_PUBLIC_LATEST_SHA: string;
    NEXT_PUBLIC_WEB_VERSION: string;
    NEXT_PUBLIC_DEFAULT_SERVICE_BASE_URL: string;
    NEXT_PUBLIC_AUTH_SERVICE_BASE_URL: string;
  }
}
