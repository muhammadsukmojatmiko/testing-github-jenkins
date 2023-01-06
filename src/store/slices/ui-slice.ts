import { AlertColor } from "@mui/material";
import { StateCreator } from "zustand";

type NotificationParamsType = {
  open: boolean;
  message: string;
  type: AlertColor;
  description: string | undefined;
};

export interface AppUIState {
  isSidebarOpenOnMobile: boolean;
  notificationParams: NotificationParamsType;
  setIsSidebarOpenOnMobile: (open: boolean) => void;
  setNotificaitonParams: (params: NotificationParamsType) => void;
}

export const createAppUISlice: StateCreator<AppUIState> = (set, get, api) => ({
  isSidebarOpenOnMobile: false,
  notificationParams: {
    open: false,
    message: "",
    type: "success",
    description: "",
  },
  setIsSidebarOpenOnMobile: (open) =>
    set((state) => ({ isSidebarOpenOnMobile: !state.isSidebarOpenOnMobile })),
  setNotificaitonParams: (params: NotificationParamsType) =>
    set(() => ({ notificationParams: params })),
});
