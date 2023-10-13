import { TextFieldVariants } from "@mui/material";
import { HTMLInputTypeAttribute } from "react";

export interface InputFieldProps {
  onChange: (value: string) => void;
  label: string;
  variant: TextFieldVariants;
  type: HTMLInputTypeAttribute;
  id: string;
  required?: boolean;
}
