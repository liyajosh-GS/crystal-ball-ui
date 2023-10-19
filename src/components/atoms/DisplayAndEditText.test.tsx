import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import DisplayAndEditText from "./DisplayAndEditTextField";

describe("DisplayAndEditText", () => {
  const props = {
    id: "inputId",
    name: "inputName",
    value: "Initial Value",
    disabled: true,
    onChange: jest.fn(),
  };

  it("renders the DisplayAndEditText component", () => {
    render(<DisplayAndEditText {...props} />);
    const inputElement = screen.getByTestId("display-edit-text");
    expect(inputElement).toBeInTheDocument();
  });

  it("displays the provided value", () => {
    render(<DisplayAndEditText {...props} />);
    const inputElement = screen.getByTestId("display-edit-text");
    expect(inputElement).toHaveValue(props.value);
  });

  it("applies the disabled attribute", () => {
    render(<DisplayAndEditText {...props} />);
    const inputElement = screen.getByTestId("display-edit-text");
    expect(inputElement).toBeDisabled();
  });

  it("calls the onChange function when input changes", () => {
    render(<DisplayAndEditText {...props} />);
    const inputElement = screen.getByTestId("display-edit-text");
    const newValue = "New Value";

    fireEvent.change(inputElement, { target: { value: newValue } });
    expect(props.onChange).toHaveBeenCalledWith(newValue);
  });
});
