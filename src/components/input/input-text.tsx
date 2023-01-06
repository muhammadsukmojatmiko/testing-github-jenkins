import { TextField, TextFieldProps } from "@mui/material";
import {
  Control,
  Controller,
  FieldErrorsImpl,
  UseControllerProps,
} from "@pankod/refine-react-hook-form";
import React, { ReactNode } from "react";

type TextInputType =
  | "text"
  | "number"
  | "tel"
  | "email"
  | "password"
  | "alphanumeric";

export type TextInputProps = {
  textFieldProps: {
    label: string | ReactNode;
    type: TextInputType;
  } & Omit<TextFieldProps, "type" | "label">;
  controlProps: {
    name: string;
    control: Control;
  } & Omit<UseControllerProps, "control" | "name">;
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: any;
    }>
  >;
  minValueValidationErrorMsg?: (minVal: number) => string;
  maxValueValidationErrorMsg?: (maxVal: number) => string;
  minLengthValidationErrorMsg?: (minLength: number) => string;
  maxLengthValidationErrorMsg?: (maxLength: number) => string;
  requiredValidationErrorMsg?: () => string;
};

export const TextInput: React.FC<TextInputProps> = ({
  textFieldProps: { label, type = "text", required = false, ...restTextField },
  controlProps: { control, name, rules: rulesFromProps = {}, ...restControl },
  minLength = 0,
  maxLength = 524_288,
  minValue = Number.MIN_SAFE_INTEGER,
  maxValue = Number.MAX_SAFE_INTEGER,
  requiredValidationErrorMsg,
  minValueValidationErrorMsg,
  maxValueValidationErrorMsg,
  minLengthValidationErrorMsg,
  maxLengthValidationErrorMsg,
  errors,
}) => {
  const rules = {
    ...JSON.parse(JSON.stringify(rulesFromProps)),
    ...(required && {
      required: requiredValidationErrorMsg?.() ?? `${label} wajib diisi`,
    }),
    ...(minValue && {
      value: minValue,
      message:
        minValueValidationErrorMsg?.(minValue) ??
        `Angka tidak boleh kurang dari ${minValue}`,
    }),
    ...(maxValue && {
      value: maxValue,
      message:
        maxValueValidationErrorMsg?.(maxValue) ??
        `Angka tidak boleh lebih dari ${maxValue}`,
    }),
    ...(minLength && {
      value: minLength,
      message:
        minLengthValidationErrorMsg?.(minLength) ??
        `Panjang minimal ${minLength} karakter`,
    }),
    ...(maxLength && {
      value: maxLength,
      message:
        maxLengthValidationErrorMsg?.(maxLength) ??
        `Panjang maksimal ${maxLength} karakter`,
    }),
  };
  return (
    <Controller
      {...restControl}
      name={name}
      control={control}
      rules={rules}
      render={({ field: { ref, ...field } }) => (
        <TextField
          {...field}
          {...restTextField}
          label={label}
          type={type}
          variant="standard"
          onChange={({ target: { value } }) => {
            type === "number" && value !== ""
              ? field.onChange(+value)
              : field.onChange(value);
          }}
          fullWidth
          required={required}
          error={errors?.[name] && true}
          helperText={errors?.[name]?.message?.toString()}
        />
      )}
    />
  );
};
