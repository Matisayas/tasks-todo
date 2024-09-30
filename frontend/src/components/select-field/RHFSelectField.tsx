import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface RHFSelectFieldProps {
  name: string;
  label: string;
  options: { label: string; value: any }[];
  disabled?: boolean;
  multiple?: boolean;
  width?: string;
  placeholder?: string;
}

export default function RHFSelectField({
  name,
  label,
  width,
  options,
  placeholder,
  disabled,
  multiple = false,
}: RHFSelectFieldProps) {
  const { control } = useFormContext();

  return (
    <Box maxWidth="100%">
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <FormControl fullWidth error={!!fieldState.error}>
            <InputLabel>{label}</InputLabel>
            <Select
              multiple={multiple}
              disabled={disabled}
              value={field.value || (multiple ? [] : "")}
              onChange={(e) => field.onChange(e.target.value)}
              label={label}
              sx={{ width: "200px" }}
              placeholder="Select Category "
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {fieldState.error?.message && (
              <FormHelperText>{fieldState.error.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />
    </Box>
  );
}
