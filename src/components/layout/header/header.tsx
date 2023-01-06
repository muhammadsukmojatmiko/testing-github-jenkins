import MenuIcon from "@mui/icons-material/Menu";
import { Box, Theme, useMediaQuery, useTheme } from "@mui/material";
import { useAppStore } from "@store/store";
import { FC } from "react";
import { SidebarProfile } from "../sidebar/sidebar-profile";

export const Header: FC = () => {
  const theme = useTheme();
  const isSm = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
  const isSidebarOpenOnMobile = useAppStore(
    (state) => state.ui.isSidebarOpenOnMobile,
  );
  const setIsSidebarOpenOnMobile = useAppStore(
    (state) => state.ui.setIsSidebarOpenOnMobile,
  );

  const handleMenuClick = () => {
    setIsSidebarOpenOnMobile(!isSidebarOpenOnMobile);
  };

  if (!isSm) {
    return null;
  }

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: theme.palette.common.white,
        zIndex: (theme) => theme.zIndex.drawer,
        padding: "28px 24px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* TODO: connect with user data */}
        <SidebarProfile
          title="Admin"
          subtitle="Agriaku Logistik"
          showDivider={false}
          withPadding={false}
        />

        <MenuIcon width={48} height={48} onClick={handleMenuClick} />
      </Box>
    </Box>
  );
};
