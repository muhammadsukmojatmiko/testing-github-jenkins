import { AgButton, AgFlexColumn, AgText } from "@agriaku/base-ui";
import farmersImg from "@public/images/farmers.png";
import Image from "next/image";
import { FC } from "react";

export type EmptyListProps = {
  title: string;
  subtitle: string;
  showBtn?: boolean;
  btnText?: string;
  onBtnClick?: () => void;
};
export const EmptyList: FC<EmptyListProps> = ({
  title,
  subtitle,
  showBtn = false,
  btnText = "",
  onBtnClick,
}) => {
  return (
    <AgFlexColumn
      sx={{
        alignItems: "center",
        padding: {
          xs: "20px",
          md: "80px 180px",
        },
      }}
    >
      <Image src={farmersImg} />
      <AgText
        value={title}
        fontWeight="bold"
        variant="h5"
        mt={"20px"}
        mb={"12px"}
      />
      <AgText
        value={subtitle}
        variant="body1"
        style={{ textAlign: "center" }}
      />
      {showBtn && (
        <>
          <AgButton
            onClick={onBtnClick}
            sx={{ textTransform: "none", mt: "20px" }}
          >
            {btnText}
          </AgButton>
        </>
      )}
    </AgFlexColumn>
  );
};
