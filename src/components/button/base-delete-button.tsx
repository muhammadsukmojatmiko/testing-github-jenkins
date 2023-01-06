import {
  AgButton,
  AgFlexColumn,
  AgFlexRow,
  AgModal,
  AgText,
} from "@agriaku/base-ui";
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingButton, { LoadingButtonProps } from "@mui/lab/LoadingButton";
import { Box, SvgIconProps, Theme, useMediaQuery } from "@mui/material";
import { FC, ReactNode, useState } from "react";

export type AgBaseDeleteButtonProps = {
  hideText?: boolean;
  isLoading?: boolean;
  svgIconProps?: SvgIconProps;
  children?: ReactNode;
  onDelete?: () => void;
} & LoadingButtonProps;
export const AgBaseDeleteButton: FC<AgBaseDeleteButtonProps> = ({
  hideText,
  isLoading = false,
  disabled = false,
  svgIconProps = {},
  sx = {},
  children,
  onDelete = () => {},
  ...restProps
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleDelete = () => {
    onDelete();
    setShowModal(false);
  };

  return (
    <>
      <DeleteModalConfirmation
        open={showModal}
        onDelete={handleDelete}
        onCancel={() => setShowModal(false)}
      />
      <LoadingButton
        color="error"
        onClick={() => setShowModal(true)}
        disabled={disabled}
        loading={isLoading}
        sx={{ minWidth: 0, ...sx }}
        loadingPosition={hideText ? "center" : "start"}
        data-testid={"refine-delete-button"}
        {...restProps}
      >
        {hideText ? (
          <DeleteIcon fontSize="small" {...svgIconProps} />
        ) : (
          <AgButton
            disabled={disabled}
            variant="outlined"
            color="error"
            sx={{ textTransform: "none" }}
          >
            <DeleteIcon {...svgIconProps} />
            <AgText value="Hapus" sx={{ ml: "4px", fontWeight: 650 }} />
          </AgButton>
        )}
      </LoadingButton>
    </>
  );
};

export type DeleteModalConfirmationProps = {
  open: boolean;
  onCancel?: () => void;
  onDelete?: () => void;
};
export function DeleteModalConfirmation({
  open,
  onCancel = () => {},
  onDelete = () => {},
}: DeleteModalConfirmationProps) {
  const isSm = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));

  const cta = (
    <Box>
      <AgFlexRow sx={{ justifyContent: "center", padding: "16px" }}>
        <AgButton
          fullWidth
          variant="outlined"
          onClick={onCancel}
          sx={{ marginRight: "8px", textTransform: "none" }}
        >
          Tidak
        </AgButton>
        <AgButton fullWidth onClick={onDelete} sx={{ textTransform: "none" }}>
          Iya
        </AgButton>
      </AgFlexRow>
    </Box>
  );

  return (
    // @ts-expect-error
    <AgModal open={open} cta={cta} width={isSm ? "95%" : "500px"}>
      <AgFlexColumn sx={{ textAlign: "center" }}>
        <AgText
          value={"Apakah Anda yakin ingin menghapus?"}
          variant="h6"
          fontWeight={"bold"}
          sx={{ paddingTop: 0 }}
        />
      </AgFlexColumn>
    </AgModal>
  );
}
