import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { useController } from "react-hook-form";

export interface RHFCheckBoxProps {
  name: string;
  label: string;
  flex?: number;
  disabled?: boolean;
  onChangeCB?: (value: boolean) => void;
}

export default function RHFCheckBoxField(props: RHFCheckBoxProps) {
  const { name, label, flex = 1, disabled, onChangeCB } = props;
  const { field } = useController({ name });

  const onCHangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(e.target.checked);
    if (onChangeCB) onChangeCB(e.target.checked);
  };

  return (
    <FormGroup sx={{ flex }}>
      <FormControlLabel
        control={
          <Checkbox
            data-cy={`${name}-checkbox`}
            disabled={disabled}
            checked={field.value}
            onChange={onCHangeHandler}
          />
        }
        label={label}
      />
    </FormGroup>
  );
}
