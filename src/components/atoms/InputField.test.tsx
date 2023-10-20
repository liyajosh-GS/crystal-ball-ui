import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import InputField from "./InputField";
import { TextFieldVariants } from "@mui/material/TextField/TextField";

describe("InputField", () => {
  const onChange = jest.fn();

  const props = {
    onChange,
    label: "Label",
    type: "text",
    variant: "standard" as TextFieldVariants,
    id: "inputId",
    required: false,
  };

  it("renders the InputField component", () => {
    render(<InputField {...props} />);
    const inputElement = screen.getByTestId("input-field");
    expect(inputElement).toBeInTheDocument();
  });

  it("displays the label", () => {
    render(<InputField {...props} />);
    const labelElement = screen.getByText(props.label);
    expect(labelElement).toBeInTheDocument();
  });

  it("calls the onChange function when input changes", () => {
    render(<InputField {...props} />);
    const inputElement = screen.getByTestId("input-field");

    const newValue = "New Value";
    fireEvent.change(inputElement, { target: { value: newValue } });
    expect(onChange).toHaveBeenCalledWith(newValue);
  });
});
