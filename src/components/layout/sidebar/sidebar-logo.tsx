import { Box } from "@mui/material";
import { FC } from "react";
import Image from "next/image";
import { AgText } from "@agriaku/base-ui";
import AgLogo from "@public/icons/ag_logo.svg";

export const SidebarLogo: FC = () => {
  return (
    <Box sx={{ position: "fixed", bottom: "36px", left: "32px" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <AgText value="Powered by:" variant="caption" />
        <Image src={AgLogo} height={52} width={111} />

        <hr style={{ visibility: "hidden" }} />

        {process.env.NEXT_PUBLIC_TARGET_ENV == "production" ? (
          // TODO: replace URL
          <a
            href="https://seller-changelog.netlify.app/"
            target="_blank"
            rel="noreferrer"
            style={{
              textDecoration: "none",
            }}
          >
            <AgText
              value={`Version: ${process.env.NEXT_PUBLIC_WEB_VERSION}`}
              variant="caption"
              color="primary.main"
            />
          </a>
        ) : (
          <AgText
            value={`Build number: ${process.env.NEXT_PUBLIC_LATEST_SHA}`}
            variant="caption"
          />
        )}
      </Box>
    </Box>
  );
};
