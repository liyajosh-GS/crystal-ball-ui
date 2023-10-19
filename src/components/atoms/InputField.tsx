import * as React from "react";
import { TextField } from "@mui/material";
import { InputFieldProps } from "../../models/components/atoms/InputFieldProps";

const InputField: React.FC<InputFieldProps> = React.memo(
  ({ onChange, label, type, variant, id, required = false }) => {
    return (
      <>
        <TextField
          required={required}
          id={id}
          name={id}
          label={label}
          fullWidth
          type={type}
          variant={variant}
          onChange={(event) => onChange(event.target.value)}
          inputProps={{ "data-testid": "input-field" }}
        />
      </>
    );
  }
);

export default InputField;
