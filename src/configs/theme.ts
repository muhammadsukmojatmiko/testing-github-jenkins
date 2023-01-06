import { agriakuBlack, agriakuRed, agriakuThemev5 } from "@agriaku/base-ui";
import { createTheme } from "@mui/material/styles";

const overrideTypography = createTheme({
  typography: {
    fontFamily: "Source Sans Pro, Roboto, sans-serif !important",
  },
});

export const theme = createTheme({
  ...agriakuThemev5,
  typography: {
    ...agriakuThemev5.typography,
    ...overrideTypography.typography,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: () => {
        return {
          body: {
            height: "100vh",
            width: "100vw",
          },
        };
      },
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
      },
      styleOverrides: {
        root: {
          color: agriakuBlack[950],
          fontWeight: "bold",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: agriakuRed[500],
        },
      },
    },
  },
});
