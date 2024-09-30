"use client";

import { utils } from "@/utils";
import { Box, TextField, TextFieldProps } from "@mui/material";
import { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";

export type RHFTextFieldProps = TextFieldProps & {
  name: string;
  flex?: number;
  maxLength?: number;
  startAdornment?: React.ReactNode | string;
  endAdornment?: React.ReactNode | string;
  onChangeCB?: (value: any) => void;
  min?: number;
  max?: number;
};

export default function RHFTextField(props: RHFTextFieldProps) {
  const {
    name,
    helperText,
    startAdornment,
    endAdornment,
    flex = 1,
    maxLength = 191,
    min,
    max,
    onChangeCB,
    ...other
  } = props;
  const { control } = useFormContext();
  const inputRef = useRef<HTMLInputElement | null>(null); // Add ref for the input element

  return (
    <Box flex={flex}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            inputRef={inputRef} // Attach ref to TextField
            inputProps={{ "data-cy": `${name}-input` }}
            fullWidth
            value={
              props.type === "number" && !!field.value
                ? utils.number.fFloat(field.value)
                : field.value
            }
            onFocus={() => {
              if (props.type === "number" && inputRef.current) {
                inputRef.current.select(); // Select the current value on focus
              }
            }}
            onChange={(e) => {
              const val = e.target.value;
              if (!val) {
                return field.onChange(null);
              }

              if (val?.toString().length > maxLength) return;

              if (props.type === "number") {
                if (typeof min !== "undefined" && Number(val) < min) {
                  field.onChange(Number(min));
                  onChangeCB && onChangeCB(Number(min));
                  return;
                }

                if (typeof max !== "undefined" && Number(val) > max) {
                  field.onChange(Number(max));
                  onChangeCB && onChangeCB(Number(max));
                  return;
                }

                field.onChange(Number(val));
                onChangeCB && onChangeCB(Number(val));
              } else {
                field.onChange(val);
                onChangeCB && onChangeCB(val);
              }
            }}
            error={!!error}
            helperText={error?.message || helperText}
            {...other}
            InputProps={{
              startAdornment: startAdornment && startAdornment,
              endAdornment: endAdornment && endAdornment,
            }}
          />
        )}
      />
    </Box>
  );
}
