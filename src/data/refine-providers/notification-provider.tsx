import {
  NotificationProvider,
  OpenNotificationParams,
} from "@pankod/refine-core";
import { useAppStore } from "@store/store";

export const notificationProvider: NotificationProvider = {
  open: (notificationParam: OpenNotificationParams) => {
    const { message, type, description, key } = notificationParam;
    const setNotificationParams =
      useAppStore.getState().ui.setNotificaitonParams;
    if (type === "error" || type === "success") {
      setNotificationParams({ open: true, message, type, description });
    }
  },
  close: (key: string) => {},
};
