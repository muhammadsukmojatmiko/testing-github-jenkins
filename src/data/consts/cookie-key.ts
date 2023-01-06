export enum CookieKey {
  token,
}

export namespace CookieKey {
  export function getName(type: CookieKey): string {
    switch (type) {
      case CookieKey.token:
        return "token";
    }
  }
}
