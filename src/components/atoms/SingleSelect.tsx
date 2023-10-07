import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import * as React from "react";
import { SingleSelectProps } from "../../models/components/atoms/SingleSelectProps";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      textAlign: "left",
    },
    label: {
      marginLeft: theme.spacing(-2),
    },
  })
);

const SingleSelect: React.FC<SingleSelectProps> = ({
  dropdownOptions,
  onChange,
  label,
  defaultValue,
  disabled = false,
}) => {
  const [value, setValue] = React.useState<string>("");
  const classes = useStyles();

  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
    setValue(event.target.value);
  };

  const getOptions = () => {
    return dropdownOptions.map((option) => (
      <MenuItem value={option.value}>{option.label}</MenuItem>
    ));
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel className={classes.label}>{label}</InputLabel>
        <Select
          variant="standard"
          value={defaultValue || ""}
          onChange={handleChange}
          fullWidth
          defaultValue={defaultValue}
          className={classes.input}
          disabled={disabled}
        >
          {getOptions()}
        </Select>
      </FormControl>
    </>
  );
};

export default SingleSelect;
