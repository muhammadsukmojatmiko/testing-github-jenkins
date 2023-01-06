import { Box, Drawer, List, useTheme } from "@mui/material";
import {
  useIsExistAuthentication,
  useLogout,
  useMenu,
  useRefineContext,
} from "@pankod/refine-core";
import { useAppStore } from "@store/store";
import React from "react";
import { MenuItem, MenuItemWithAccessControl } from "../menu/menu-item";
import { SidebarLogo } from "./sidebar-logo";
import { SidebarProfile } from "./sidebar-profile";

type SiderRenderProps = {
  items?: JSX.Element[];
  logout?: React.ReactNode;
  dashboard?: React.ReactNode;
  collapsed?: boolean;
};

type RefineLayoutSiderProps = {
  render?: (props: SiderRenderProps) => React.ReactNode;
  showLogout?: boolean;
};

export const Sidebar: React.FC<RefineLayoutSiderProps> = ({
  render,
  showLogout = true,
}) => {
  const isSidebarOpenOnMobile = useAppStore(
    (state) => state.ui.isSidebarOpenOnMobile,
  );
  const setIsSidebarOpenOnMobile = useAppStore(
    (state) => state.ui.setIsSidebarOpenOnMobile,
  );

  const drawerWidth = () => {
    return 254;
  };

  const { hasDashboard } = useRefineContext();
  const { menuItems, selectedKey } = useMenu();

  const isExistAuthentication = useIsExistAuthentication();
  const { mutate: mutateLogout } = useLogout();
  const theme = useTheme();

  const dashboard = hasDashboard ? (
    <MenuItemWithAccessControl
      menu={{
        name: "Dashboard",
        route: "/",
        children: [],
      }}
    />
  ) : null;

  const logout = isExistAuthentication && showLogout && (
    <MenuItem
      onParentClick={() => mutateLogout()}
      menu={{ name: "Logout", label: "Logout", children: [] }}
    />
  );

  const items = menuItems.map((menu, i) => (
    <MenuItemWithAccessControl
      menu={menu}
      key={i + (menu.name ?? menu.label)}
      selectedKey={selectedKey.slice(1)} // remove '/'1
    />
  ));

  const renderSider = () => {
    if (render) {
      return render({
        dashboard,
        logout,
        items,
      });
    }
    return (
      <>
        {dashboard}
        {items}
        {logout}
      </>
    );
  };

  const drawer = <List disablePadding>{renderSider()}</List>;

  const profile = (
    // TODO: connect with user data
    <SidebarProfile title={"Admin"} subtitle={"Agriaku Logistik"} />
  );

  return (
    <>
      <Box
        component="nav"
        sx={{
          zIndex: theme.zIndex.drawer + 2,
          width: { sm: drawerWidth() },
          display: "flex",
        }}
      >
        {/* on sm viewport */}
        <Drawer
          variant="temporary"
          open={isSidebarOpenOnMobile}
          onClose={() => setIsSidebarOpenOnMobile(false)}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: 256,
              bgcolor: theme.palette.common.white,
            },
            position: "fixed",
            left: 0,
            top: 0,
          }}
        >
          {profile}
          {drawer}
          <SidebarLogo />
        </Drawer>

        {/* on md viewport */}
        <Drawer
          variant="permanent"
          PaperProps={{ elevation: 1 }}
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              backgroundColor: theme.palette.common.white,
              overflow: "hidden",
              transition: "width 200ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
            },
          }}
          open
        >
          <Box
            sx={{
              flexGrow: 1,
              overflowX: "hidden",
              overflowY: "auto",
            }}
          >
            {profile}
            {drawer}
            <SidebarLogo />
          </Box>
        </Drawer>
      </Box>
    </>
  );
};
