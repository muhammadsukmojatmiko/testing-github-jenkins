// Taken from https://github.com/pmndrs/zustand/issues/178
import { StateCreator, StoreApi, Subscribe } from "zustand";

export function namespace<K extends string, T extends unknown>(
  key: K,
  creator: StateCreator<T>,
): (liftedSet: any, liftedGet: any, liftedApi: any) => T {
  return (liftedSet: any, liftedGet: any, liftedApi: any) => {
    const setState: StoreApi<T>["setState"] = (
      updates: any,
      replace?: boolean,
    ) => {
      liftedSet((liftedState: any) => {
        if (typeof updates === "function") {
          updates = updates(liftedState[key]);
        }
        if (!replace) {
          updates = { ...liftedState[key], ...updates };
        }
        return {
          ...liftedState,
          [key]: updates,
        };
      }, replace);
    };

    const getState: StoreApi<T>["getState"] = () => {
      return liftedGet()[key];
    };

    const subscribe = ((listener: any, selector: any, equalityFn?: any) => {
      if (selector) {
        return liftedApi.subscribe(
          listener,
          (state: any) => selector(state[key]),
          equalityFn,
        );
      } else {
        return liftedApi.subscribe(listener, (state: any) => state[key]);
      }
    }) as Subscribe<T>;

    const destroy = () => {
      // todo?
      // - remove state slice
      // - unsubscribe listeners
    };

    const api = { getState, setState, subscribe, destroy };
    return creator(setState, getState, api);
  };
}
