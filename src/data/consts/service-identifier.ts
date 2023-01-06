const DATA_SERVICE_IDENTIFIER = {
  ApiServiceFactory: Symbol("Factory<ApiService>"),
  AuthService: Symbol("AuthService"),
  CookieFactory: Symbol("Factory<Cookie>"),
};

const DATA_SERVICE_IDENTIFIER_NAMED = {
  DefaultApiService: Symbol("ApiService"),
};

export { DATA_SERVICE_IDENTIFIER, DATA_SERVICE_IDENTIFIER_NAMED };
