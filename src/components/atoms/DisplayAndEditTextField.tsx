import * as React from "react";
import { TextField } from "@mui/material";
import { DisplayAndEditTextProps } from "../../models/components/atoms/DisplayAndEditTextProps";

const DisplayAndEditText: React.FC<DisplayAndEditTextProps> = ({
  id,
  name,
  value,
  disabled,
  onChange,
}) => {
  return (
    <>
      <TextField
        required
        id={id}
        name={name}
        value={value}
        autoComplete="given-name"
        variant="standard"
        fullWidth
        disabled={true}
        onChange={(event) => onChange && onChange(event.target.value)}
        sx={{
          marginTop: "24px",
        }}
        inputProps={{ "data-testid": "display-edit-text" }}
      />
    </>
  );
};

export default DisplayAndEditText;
