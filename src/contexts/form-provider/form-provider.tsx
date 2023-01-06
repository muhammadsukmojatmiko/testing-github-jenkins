import { UseFormReturnType } from "@pankod/refine-react-hook-form";
import React from "react";

export const AgHookFormContext = React.createContext<UseFormReturnType>(
  undefined!,
);

export const AgHookFormProvider = AgHookFormContext.Provider;
