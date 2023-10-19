import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SingleSelect from "./SingleSelect";
import { ThemeProvider, createTheme } from "@mui/material";

describe("SingleSelect", () => {
  const onChange = jest.fn();
  const defaultValue = "default";
  const label = "Select Label";
  const dropdownOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
  ];
  const theme = createTheme();
  it("renders the SingleSelect component", () => {
    render(
      <ThemeProvider theme={theme}>
        <SingleSelect
          dropdownOptions={dropdownOptions}
          onChange={onChange}
          label={label}
          defaultValue={defaultValue}
        />
      </ThemeProvider>
    );
    const selectElement = screen.getByTestId("single-select");
    expect(selectElement).toBeInTheDocument();
  });

  it("displays the label", () => {
    render(
      <ThemeProvider theme={theme}>
        <SingleSelect
          dropdownOptions={dropdownOptions}
          onChange={onChange}
          label={label}
          defaultValue={defaultValue}
        />
      </ThemeProvider>
    );
    const labelElement = screen.getByText(label);
    expect(labelElement).toBeInTheDocument();
  });

  it("calls the onChange function when an option is selected", () => {
    render(
      <ThemeProvider theme={theme}>
        <SingleSelect
          dropdownOptions={dropdownOptions}
          onChange={onChange}
          label={label}
          defaultValue={defaultValue}
        />
      </ThemeProvider>
    );
    const selectElement = screen.getByTestId("single-select");
    fireEvent.change(selectElement, { target: { value: "option1" } });
    expect(onChange).toHaveBeenCalledWith("option1");
  });

  it("applies the disabled attribute", () => {
    render(
      <ThemeProvider theme={theme}>
        <SingleSelect
          dropdownOptions={dropdownOptions}
          onChange={onChange}
          label={label}
          defaultValue={defaultValue}
          disabled={true}
        />
      </ThemeProvider>
    );
    const selectElement = screen.getByTestId("single-select");
    expect(selectElement).toBeDisabled();
  });
});
