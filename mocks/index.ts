import type { SetupWorkerApi } from "msw";
import { SetupServerApi } from "msw/node";

export async function initMocks() {
  if (typeof window === "undefined") {
    const { server }: { server: SetupServerApi } = await import("./server");
    server.listen({ onUnhandledRequest: "bypass" });
  } else {
    const { worker }: { worker: SetupWorkerApi } = await require("./browser");
    worker.start({
      onUnhandledRequest: "warn",
    });
  }
}
