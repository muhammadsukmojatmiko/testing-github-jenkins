import { TextInput } from "@components/input/input-text";
import {
  DISTANCE_LEVEL,
  getPricingResponseEnum,
} from "@domains/master-configuration/pricing/pages/fields";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputAdornment,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Controller } from "@pankod/refine-react-hook-form";
import { AgHookFormContext } from "@src/contexts/form-provider/form-provider";
import React from "react";

const DistanceSection: React.FC = () => {
  const {
    control,
    formState: { errors },
    getValues,
    refineCore: { queryResult },
  } = React.useContext(AgHookFormContext);

  if (queryResult) {
    return (
      <Grid container direction="row" columnSpacing={{ xs: 0, md: 8 }}>
        <Grid item xs={12} md={6} paddingBottom={4}>
          <TextInput
            textFieldProps={{
              label: "Jarak Minimal",
              type: "number",
              required: true,
              InputProps: {
                endAdornment: (
                  <InputAdornment position="start">Km</InputAdornment>
                ),
              },
            }}
            controlProps={{
              name: getPricingResponseEnum.baseDistanceThreshold,
              control: control,
            }}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12} md={6} paddingBottom={4}>
          <TextInput
            textFieldProps={{
              label: "Jarak Maksimal ",
              type: "number",
              required: true,
              InputProps: {
                endAdornment: (
                  <InputAdornment position="start">Km</InputAdornment>
                ),
              },
            }}
            controlProps={{
              name: getPricingResponseEnum.maxDistance,
              control: control,
            }}
            minValue={getValues(getPricingResponseEnum.baseDistanceThreshold)}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12} md={6} paddingBottom={4}>
          <TextInput
            textFieldProps={{
              label: "Harga Jarak Dasar",
              type: "number",
              required: true,
              InputProps: {
                endAdornment: (
                  <InputAdornment position="start">Km</InputAdornment>
                ),
              },
            }}
            controlProps={{
              name: getPricingResponseEnum.baseDistancePrice,
              control: control,
            }}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12} md={6} paddingBottom={4}>
          <TextInput
            textFieldProps={{
              label: "Harga Jarak Tambahan",
              type: "number",
              required: true,
              InputProps: {
                endAdornment: (
                  <InputAdornment position="start">Km</InputAdornment>
                ),
              },
            }}
            controlProps={{
              name: getPricingResponseEnum.additionalDistancePrice,
              control: control,
            }}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12} md={6} paddingBottom={4}>
          <FormControl
            error={errors?.[getPricingResponseEnum.level] && true}
            required
            component="fieldset"
          >
            <FormLabel>Tingkatan</FormLabel>
            <Controller
              name={getPricingResponseEnum.level}
              control={control}
              defaultValue={queryResult.data?.data.level}
              rules={{ required: "Field ini dibutuhkan" }}
              render={({ field: { ref, value, ...field } }) => (
                <RadioGroup {...field} row>
                  <FormControlLabel
                    checked={value === DISTANCE_LEVEL.NATIONAL}
                    value={DISTANCE_LEVEL.NATIONAL}
                    control={<Radio />}
                    label="National"
                  />
                  <FormControlLabel
                    checked={value === DISTANCE_LEVEL.REGIONAL}
                    value={DISTANCE_LEVEL.REGIONAL}
                    control={<Radio />}
                    label="Regional"
                  />
                </RadioGroup>
              )}
            />
            <FormHelperText
              sx={{
                marginLeft: "0",
              }}
            >
              {errors?.[getPricingResponseEnum.level]?.message?.toString()}
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    );
  }
  return null;
};
export default DistanceSection;
