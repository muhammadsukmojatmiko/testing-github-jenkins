// EXAMPLE TO CREATE ZUSTAND SLICE

import create, { StateCreator } from "zustand";
import {
  createProductListPageSlice,
  ProductListPageState,
} from "./product-list-page-store";
import { namespace } from "@store/utils/store-namespace";

export interface ProductState {
  listPage: ProductListPageState;
}

export const createProductSlice: StateCreator<ProductState> = (
  set,
  get,
  api,
) => ({
  listPage: namespace("listPage", createProductListPageSlice)(set, get, api),
});
