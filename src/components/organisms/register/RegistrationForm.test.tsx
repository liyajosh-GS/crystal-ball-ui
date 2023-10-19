import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegistrationForm from "./RegistrationForm";
import { ApiContext } from "../../../contexts/ApiContext"; // Replace with the correct import for your context
import { LOGIN_API_KEY, REGISTER_API_KEY } from "../../../constants/constant";
import postData from "../../../repositories/postData";
import { AlertColor, ThemeProvider, createTheme } from "@mui/material";
import { AppContext } from "../../../contexts/AppContext";

// Mock the context data
const mockApiConfig = {
  [LOGIN_API_KEY]: "mockLoginApi",
  [REGISTER_API_KEY]: "mockRegisterApi",
};

const mockAppContextData = {
  redirectBackTo: "/",
  setRedirectBackTo: jest.fn(),
};

const mockApiContextData = {
  apiConfig: mockApiConfig,
  apiResponseMessage: "Test message",
  apiResponseType: "success" as AlertColor,
  showSnackBar: true,
  setShowSnackBar: jest.fn(),
  setApiResponseMessage: jest.fn(),
  setApiResponseType: jest.fn(),
};

jest.mock("lodash", () => ({
  get: (obj: string, key: any) => obj[key],
}));

jest.mock("../../../repositories/postData");

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe("RegistrationForm", () => {
  const theme = createTheme();
  it("renders registration form", () => {
    render(
      <ThemeProvider theme={theme}>
        <ApiContext.Provider value={mockApiContextData}>
          <AppContext.Provider value={mockAppContextData}>
            <RegistrationForm />{" "}
          </AppContext.Provider>
        </ApiContext.Provider>
      </ThemeProvider>
    );

    // Check if the registration form elements are rendered
    const userNameInput = screen.getByLabelText(/User Name/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const registerButton = screen.getByText(/Register/i);

    expect(userNameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  it("handles successful registration", async () => {
    const mockResponse = { error: null };

    (postData as jest.Mock).mockResolvedValueOnce(mockResponse);

    render(
      <ThemeProvider theme={theme}>
        <ApiContext.Provider value={mockApiContextData}>
          <AppContext.Provider value={mockAppContextData}>
            <RegistrationForm />{" "}
          </AppContext.Provider>
        </ApiContext.Provider>
      </ThemeProvider>
    );

    // Mock user input
    const userNameInput = screen.getByLabelText(/User Name/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const emailInput = screen.getByLabelText(/Email/i);

    fireEvent.change(userNameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    const registerButton = screen.getByText(/Register/i);
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(postData).toHaveBeenCalledWith(
        "mockRegisterApi",
        {
          userName: "testuser",
          password: "testpassword",
          email: "test@example.com",
        },
        null
      );
    });
    expect(mockApiContextData.setApiResponseType).toBeCalledTimes(0);
  });

  it("handles registration error", async () => {
    const mockError = "Registration failed.";

    const mockResponse = { error: mockError };

    (postData as jest.Mock).mockResolvedValueOnce(mockResponse);

    render(
      <ThemeProvider theme={theme}>
        <ApiContext.Provider value={mockApiContextData}>
          <AppContext.Provider value={mockAppContextData}>
            <RegistrationForm />{" "}
          </AppContext.Provider>
        </ApiContext.Provider>
      </ThemeProvider>
    );

    const userNameInput = screen.getByLabelText(/User Name/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const emailInput = screen.getByLabelText(/Email/i);

    fireEvent.change(userNameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    const registerButton = screen.getByText(/Register/i);
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(postData).toHaveBeenCalledWith(
        "mockRegisterApi",
        {
          userName: "testuser",
          password: "testpassword",
          email: "test@example.com",
        },
        null
      );
    });

    // Check if the error message is displayed
    expect(mockApiContextData.setApiResponseType).toBeCalledTimes(1);
    expect(mockApiContextData.setApiResponseType).toHaveBeenCalledWith("error");
  });
});
