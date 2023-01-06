import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import { Option } from "@pankod/refine-core";
import {
  Control,
  Controller,
  FieldErrorsImpl,
  UseControllerProps,
} from "@pankod/refine-react-hook-form";
import { uniqueId } from "lodash";
import React, { ReactNode } from "react";

export type SelectInputProps = {
  data: Option[];
  selectProps: {
    label: string | ReactNode;
  } & Omit<SelectProps, "label">;
  controlProps: {
    name: string;
    control: Control;
  } & Omit<UseControllerProps, "control" | "name">;
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: any;
    }>
  >;
  requiredValidationErrorMsg?: () => string;
};

export const SelectInput: React.FC<SelectInputProps> = ({
  data,
  selectProps: { label, required = false, ...restSelectProps },
  controlProps: {
    control,
    defaultValue = "",
    name,
    rules: rulesFromProps = {},
    ...restControl
  },
  requiredValidationErrorMsg,
  errors,
}) => {
  const id = uniqueId();
  const rules = {
    ...JSON.parse(JSON.stringify(rulesFromProps)),
    ...(required && {
      required: requiredValidationErrorMsg?.() ?? `${label} wajib diisi`,
    }),
  };

  return (
    <FormControl
      variant="standard"
      fullWidth
      required
      error={errors?.[name] && true}
    >
      <InputLabel id={id}>{label}</InputLabel>
      <Controller
        {...restControl}
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field: { ref, ...field } }) => (
          <Select {...field} {...restSelectProps} labelId={id} fullWidth>
            {data?.map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      <FormHelperText>{errors?.[name]?.message?.toString()}</FormHelperText>
    </FormControl>
  );
};
