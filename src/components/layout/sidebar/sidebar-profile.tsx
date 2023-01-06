import { AgText } from "@agriaku/base-ui";
import { Box, Divider } from "@mui/material";
import Image from "next/image";
import { FC } from "react";
import ProfilePlaceholderImg from "@public/images/account_profile_placeholder.png";

export type SidebarProfileProps = {
  title: string;
  subtitle: string;
  showDivider?: boolean;
  withPadding?: boolean;
};
export const SidebarProfile: FC<SidebarProfileProps> = ({
  title,
  subtitle,
  showDivider = true,
  withPadding = true,
}) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: withPadding ? "20px" : 0,
        }}
      >
        <Image src={ProfilePlaceholderImg} height={60} width={60} />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "16px",
          }}
        >
          <AgText variant="body1" value={title} />
          <AgText variant="body1" value={subtitle} fontWeight="bold" />
        </Box>
      </Box>
      {showDivider && <Divider></Divider>}
    </Box>
  );
};
