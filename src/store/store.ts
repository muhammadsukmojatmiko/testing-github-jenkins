import {
  createProductSlice,
  ProductState,
} from "@domains/master-configuration/pricing/store/product-store";
import create from "zustand";
import { devtools } from "zustand/middleware";

import { AppUIState, createAppUISlice } from "./slices/ui-slice";
import { namespace } from "./utils/store-namespace";

export interface AppState {
  product: ProductState;
  ui: AppUIState;
}

export const useAppStore = create<AppState>()(
  devtools(
    (set, get, api) => ({
      product: namespace("product", createProductSlice)(set, get, api),
      ui: namespace("ui", createAppUISlice)(set, get, api),
    }),
    { serialize: true },
  ),
);
