import { Box } from "@mui/material";
import { LayoutProps } from "@pankod/refine-core";
import React from "react";
import { Header as AppHeader } from "./header/header";
import { Sidebar } from "./sidebar/sidebar";

export const Layout: React.FC<LayoutProps> = ({
  Sider,
  Header,
  Footer,
  OffLayoutArea,
  children,
}) => {
  const SiderToRender = Sider ?? Sidebar;
  const HeaderToRender = Header ?? AppHeader;

  return (
    <Box display="flex" flexDirection="row">
      {SiderToRender && <SiderToRender showLogout={false} />}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: "100vh",
        }}
      >
        {HeaderToRender && <HeaderToRender />}
        <Box
          component="main"
          sx={{
            p: { xs: 1, md: 2, lg: 4 },
            flexGrow: 1,
          }}
        >
          {children}
        </Box>
        {Footer && <Footer />}
      </Box>
      {OffLayoutArea && <OffLayoutArea />}
    </Box>
  );
};
