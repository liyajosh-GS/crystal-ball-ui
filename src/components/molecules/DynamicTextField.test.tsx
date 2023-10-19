import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import DynamicTextFieldForm from "./DynamicTextField";

describe("DynamicTextFieldForm", () => {
  const onChange = jest.fn();
  const label = "Input Label";

  it("renders the DynamicTextFieldForm component", () => {
    render(<DynamicTextFieldForm label={label} onChange={onChange} />);
    const textField = screen.getByLabelText(label);
    expect(textField).toBeInTheDocument();
  });

  it("adds a new input on button click", () => {
    render(<DynamicTextFieldForm label={label} onChange={onChange} />);
    const addButton = screen.getByLabelText(/Add input/i);
    fireEvent.click(addButton);
    const newTextField = screen.getAllByLabelText(label);
    expect(newTextField.length).toBe(2); // There should be two text fields
  });

  it("removes an input on button click", () => {
    render(<DynamicTextFieldForm label={label} onChange={onChange} />);
    const removeButton = screen.getByLabelText(/Remove input/i);
    fireEvent.click(removeButton);
    const textFields = screen.getAllByLabelText(label);
    expect(textFields.length).toBe(1); // There should be one text field left
  });

  it("calls onChange when input value changes", () => {
    render(<DynamicTextFieldForm label={label} onChange={onChange} />);
    const textField = screen.getByLabelText(label);
    const newValue = "New Value";
    fireEvent.change(textField, { target: { value: newValue } });
    expect(onChange).toHaveBeenCalledWith([newValue]);
  });

  it("disables remove button for the first input", () => {
    render(<DynamicTextFieldForm label={label} onChange={onChange} />);
    const removeButton = screen.getAllByLabelText("Remove input")[0];
    expect(removeButton).toBeDisabled();
  });
});
