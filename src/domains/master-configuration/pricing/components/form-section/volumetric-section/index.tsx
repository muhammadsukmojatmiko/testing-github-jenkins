import { TextInput } from "@components/input/input-text";
import { getPricingResponseEnum } from "@domains/master-configuration/pricing/pages/fields";
import { Grid, InputAdornment } from "@mui/material";
import { AgHookFormContext } from "@src/contexts/form-provider/form-provider";
import React from "react";

const VolumetricSection: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = React.useContext(AgHookFormContext);

  return (
    <Grid container direction="row" columnSpacing={{ xs: 0, md: 8 }}>
      <Grid item xs={12} paddingBottom={4}>
        <TextInput
          textFieldProps={{
            label: "Batas Volumetrik",
            type: "number",
            required: true,
            InputProps: {
              endAdornment: (
                <InputAdornment position="start">
                  m
                  <sup>
                    <small>3</small>
                  </sup>
                </InputAdornment>
              ),
            },
          }}
          controlProps={{
            name: getPricingResponseEnum.baseVolumeThreshold,
            control: control,
          }}
          errors={errors}
        />
      </Grid>
      <Grid item xs={12} md={6} paddingBottom={4}>
        <TextInput
          textFieldProps={{
            label: "Harga Volumetrik Dasar",
            type: "number",
            required: true,
            InputProps: {
              startAdornment: (
                <InputAdornment position="start">Rp</InputAdornment>
              ),
            },
          }}
          controlProps={{
            name: getPricingResponseEnum.baseVolumePrice,
            control: control,
          }}
          errors={errors}
        />
      </Grid>
      <Grid item xs={12} md={6} paddingBottom={4}>
        <TextInput
          textFieldProps={{
            label: "Harga Volumetrik Tambahan",
            type: "number",
            required: true,
            InputProps: {
              startAdornment: (
                <InputAdornment position="start">Rp</InputAdornment>
              ),
            },
          }}
          controlProps={{
            name: getPricingResponseEnum.additionalVolumePrice,
            control: control,
          }}
          errors={errors}
        />
      </Grid>
    </Grid>
  );
};

export default VolumetricSection;
