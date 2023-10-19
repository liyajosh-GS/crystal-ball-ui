import { IconButton, Theme } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import PlusIcon from "@mui/icons-material/Add";
import { makeStyles, createStyles } from "@mui/styles";
import { DynamicTextFieldProps } from "../../models/components/molecules/DynamicTextFieldProps";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      width: "90%",
    },
  })
);

interface input {
  id: number;
  name: string;
}

const DynamicTextFieldForm: React.FC<DynamicTextFieldProps> = ({
  label,
  onChange,
}) => {
  const [inputs, setInputs] = useState<input[]>([{ id: 1, name: "" }]);
  const classes = useStyles();

  const addInput = () => {
    const newinputId = inputs.length + 1;
    setInputs([...inputs, { id: newinputId, name: "" }]);
  };

  const removeInput = (id: number) => {
    const updatedInputs = inputs.filter((input) => input.id !== id);
    setInputs(updatedInputs);
  };

  const handleOnChange = (id: number, newName: string) => {
    const updatedInputs = inputs.map((input) =>
      input.id === id ? { ...input, name: newName } : input
    );
    onChange(updatedInputs.map((input) => input.name));
    setInputs(updatedInputs);
  };

  return (
    <div>
      {inputs.map((input, index) => (
        <div key={input.id}>
          <TextField
            label={label}
            value={input.name}
            onChange={(e) => handleOnChange(input.id, e.target.value)}
            variant="standard"
            className={classes.input}
          />
          <IconButton
            color="secondary"
            onClick={() => removeInput(input.id)}
            aria-label="Remove input"
            disabled={index === 0}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={addInput}
            aria-label="Add input"
          >
            <PlusIcon />
          </IconButton>
        </div>
      ))}
    </div>
  );
};

export default DynamicTextFieldForm;
