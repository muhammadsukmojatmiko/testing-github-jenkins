import { Alert, Snackbar, Typography } from "@mui/material";
import { useAppStore } from "@store/store";

export const ToastNotification = () => {
  const { open, message, type, description } = useAppStore(
    (state) => state.ui.notificationParams,
  );
  const setNotificationparams = useAppStore(
    (state) => state.ui.setNotificaitonParams,
  );
  const handleClose = () => {
    setNotificationparams({ open: false, message, type, description });
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={open}
      onClose={handleClose}
      autoHideDuration={3000}
      message={message}
    >
      <Alert
        onClose={handleClose}
        severity={type}
        variant="filled"
        sx={{
          width: "500px",
        }}
      >
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: "16px",
          }}
        >
          {message}
        </Typography>
        <Typography
          sx={{
            fontWeight: "400",
            fontSize: "14px",
          }}
        >
          {description}
        </Typography>
      </Alert>
    </Snackbar>
  );
};
