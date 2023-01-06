// EXAMPLE TO MANAGE CLIENT STATE FOR PRODUCT LIST PAGE

import create, { StateCreator } from "zustand";

export interface ProductListPageState {
  counter: number;
  increase: (by: number) => void;
}

export const createProductListPageSlice: StateCreator<ProductListPageState> = (
  set,
  get,
  api,
) => ({
  counter: 0,
  increase: (by: number) => set((state) => ({ counter: state.counter + by })),
});
