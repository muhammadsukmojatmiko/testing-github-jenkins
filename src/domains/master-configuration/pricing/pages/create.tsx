import {
  AgButton,
  AgFlexRow,
  agriakuBlack,
  agriakuFontSize,
  AgText,
} from "@agriaku/base-ui";
import { Grid, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "@pankod/refine-react-hook-form";
import React, { useEffect } from "react";

import { CreatePricingRequestModel } from "@data/models/request/pricing/create-pricing-request";
import { Save } from "@mui/icons-material";
import { AgHookFormProvider } from "@src/contexts/form-provider/form-provider";
import { CreateEditPricingForm } from "../components/create-edit-pricing-form";

export const PricingCreate: React.FC<any> = () => {
  const methods = useForm<CreatePricingRequestModel>();
  const theme = useTheme();

  const {
    handleSubmit,
    refineCore: {
      onFinish,
      mutationResult: { variables },
    },
  } = methods;

  useEffect(() => {
    if (variables) {
      variables.successNotification = {
        type: "success",
        message: "Pembuatan Berhasil",
        description: "Konfigurasi Harga telah berhasil terbuat",
      };
    }
  }, [variables]);

  return (
    <AgHookFormProvider value={methods}>
      <Box
        sx={{ backgroundColor: theme.palette.common.white }}
        component="form"
      >
        <Grid flexDirection="column">
          <Grid
            container
            sx={{ px: 3, py: 4 }}
            borderBottom={`1px solid ${agriakuBlack[100]}`}
          >
            <AgText
              value="Tambah Harga"
              fontSize={agriakuFontSize[20]}
              fontWeight="bold"
            />
          </Grid>
          <CreateEditPricingForm />
          <AgFlexRow justifyContent={"end"} sx={{ padding: "16px 24px" }}>
            <AgButton
              type="submit"
              sx={{ padding: "8px 62px", fontWeight: "bold" }}
              startIcon={<Save />}
              onClick={handleSubmit(onFinish)}
            >
              Simpan
            </AgButton>
          </AgFlexRow>
        </Grid>
      </Box>
    </AgHookFormProvider>
  );
};
