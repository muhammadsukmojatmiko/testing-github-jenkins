import { Layout } from "@components/layout";
import { Header } from "@components/layout/header/header";
import { Sidebar } from "@components/layout/sidebar/sidebar";
import { ToastNotification } from "@components/notification/notification";
import { PORTAL_ID } from "@components/ui-const";
import { theme } from "@configs/theme";
import { DashboardResource } from "@data/consts/resource";
import { WINDOW_MESSAGE } from "@data/consts/window-message";
import { getAuthProvider } from "@data/refine-providers/auth-provider";
import { getDataProvider } from "@data/refine-providers/data-provider";
import { notificationProvider } from "@data/refine-providers/notification-provider";
import { PricingEdit } from "@domains/master-configuration/pricing/pages/edit";
import BuildIcon from "@mui/icons-material/Build";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { ErrorComponent, Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-nextjs-router";
import { ROUTER_PATH } from "@src/router/router-path";
import "@src/styles/reset.css";

import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Login = dynamic(() =>
  import("@domains/auth/pages/login").then((mod) => mod.Login),
);

const PricingList = dynamic(
  () =>
    import("@domains/master-configuration/pricing/pages/list").then(
      (mod) => mod.PricingList,
    ),
  { ssr: false },
);

const PricingCreate = dynamic(
  () =>
    import("@domains/master-configuration/pricing/pages/create").then(
      (mod) => mod.PricingCreate,
    ),
  { ssr: false },
);

if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
  const { initMocks } = require("@mocks");
  initMocks();
}

const authProvider = getAuthProvider();
const dataProvider = getDataProvider();

function App({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    window.addEventListener("message", (event) => {
      if (event.data === WINDOW_MESSAGE.UNAUTHORIZED) {
        router.replace(ROUTER_PATH.login);
      }
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastNotification />
      <Refine
        routerProvider={routerProvider}
        authProvider={authProvider}
        dataProvider={dataProvider}
        notificationProvider={notificationProvider}
        // TODO: handle typing error
        // @ts-ignore
        LoginPage={Login}
        resources={[
          {
            name: DashboardResource.getName(
              DashboardResource.masterConfiguration,
            ),
            icon: <BuildIcon />,
            options: {
              label: DashboardResource.getLabel(
                DashboardResource.masterConfiguration,
              ),
            },
          },
          {
            name: DashboardResource.getName(DashboardResource.pricing),
            parentName: DashboardResource.getName(
              DashboardResource.masterConfiguration,
            ),
            options: {
              route: DashboardResource.getName(DashboardResource.pricing),
              label: DashboardResource.getLabel(DashboardResource.pricing),
            },

            // @ts-ignore
            list: PricingList,
            // @ts-ignore
            create: PricingCreate,
            // @ts-ignore
            edit: PricingEdit,
          },
        ]}
        warnWhenUnsavedChanges={true}
        catchAll={<ErrorComponent />}
        disableTelemetry={true}
        Layout={Layout}
        Sider={Sidebar}
        Header={Header}
      >
        <Component {...pageProps} />
        <div id={PORTAL_ID}></div>
      </Refine>
    </ThemeProvider>
  );
}

export default App;
