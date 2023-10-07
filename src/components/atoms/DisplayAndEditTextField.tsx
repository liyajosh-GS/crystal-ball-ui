import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { makeStyles, createStyles } from "@mui/styles";
import { TextField, Theme } from "@mui/material";
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
        //InputProps={{ disableUnderline: true }}
      />
    </>
  );
};

export default DisplayAndEditText;
