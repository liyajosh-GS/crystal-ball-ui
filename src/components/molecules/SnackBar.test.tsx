import React from "react";
import { render, screen, act } from "@testing-library/react";
import SnackbarComponent from "./Snackbar";
import { ApiContext } from "../../contexts/ApiContext";
import { AlertColor } from "@mui/material";

const mockContextData = {
  apiResponseMessage: "Test message",
  apiResponseType: "success" as AlertColor,
  showSnackBar: true,
  setShowSnackBar: jest.fn(),
  setApiResponseMessage: jest.fn(),
  setApiResponseType: jest.fn(),
  apiConfig: {},
};

jest.useFakeTimers();

describe("SnackbarComponent", () => {
  it("renders Snackbar with the correct message and type", () => {
    render(
      <ApiContext.Provider value={mockContextData}>
        <SnackbarComponent />
      </ApiContext.Provider>
    );

    const snackbar = screen.getByTestId("snackbar");
    const alert = screen.getByTestId("alert");

    expect(snackbar).toBeInTheDocument();
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent("Test message");
  });

  it("closes Snackbar after autoHideDuration", () => {
    render(
      <ApiContext.Provider value={mockContextData}>
        <SnackbarComponent />
      </ApiContext.Provider>
    );

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(mockContextData.setShowSnackBar).toHaveBeenCalledWith(false);
  });

  it("closes Snackbar when the user clicks on it", () => {
    render(
      <ApiContext.Provider value={mockContextData}>
        <SnackbarComponent />
      </ApiContext.Provider>
    );

    const snackbar = screen.getByTestId("snackbar");

    act(() => {
      snackbar.click();
    });

    expect(mockContextData.setShowSnackBar).toBeCalledTimes(0);
  });
});
