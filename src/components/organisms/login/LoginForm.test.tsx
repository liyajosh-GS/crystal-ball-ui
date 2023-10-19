import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { LOGIN_API_KEY, REGISTER_API_KEY } from "../../../constants/constant";
import postData from "../../../repositories/postData";
import { ApiContext } from "../../../contexts/ApiContext";
import { AppContext } from "../../../contexts/AppContext";
import { AlertColor, ThemeProvider, createTheme } from "@mui/material";

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

describe("LoginForm", () => {
  const theme = createTheme();
  it("renders login form", () => {
    render(
      <ThemeProvider theme={theme}>
        <ApiContext.Provider value={mockApiContextData}>
          <AppContext.Provider value={mockAppContextData}>
            <LoginForm />
          </AppContext.Provider>
        </ApiContext.Provider>
      </ThemeProvider>
    );

    const userNameInput = screen.getByLabelText(/User Name/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByText(/Login/i);
    const registerLink = screen.getByTestId("goToRegister");

    expect(userNameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(registerLink).toBeInTheDocument();
  });

  it("handles successful login", async () => {
    const mockResponse = { error: null };

    (postData as jest.Mock).mockResolvedValueOnce(mockResponse);

    render(
      <ThemeProvider theme={theme}>
        <ApiContext.Provider value={mockApiContextData}>
          <AppContext.Provider value={mockAppContextData}>
            <LoginForm />
          </AppContext.Provider>
        </ApiContext.Provider>
      </ThemeProvider>
    );
    const userNameInput = screen.getByLabelText(/User Name/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.change(userNameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    const loginButton = screen.getByText(/Login/i);
    fireEvent.click(loginButton);
    await waitFor(() => {
      expect(postData).toHaveBeenCalledWith(
        "mockLoginApi",
        {
          userName: "testuser",
          password: "testpassword",
        },
        null
      );
    });
  });

  it("handles login error", async () => {
    const mockError = "Login failed.";

    const mockResponse = { error: mockError };

    (postData as jest.Mock).mockResolvedValueOnce(mockResponse);

    render(
      <ThemeProvider theme={theme}>
        <ApiContext.Provider value={mockApiContextData}>
          <AppContext.Provider value={mockAppContextData}>
            <LoginForm />
          </AppContext.Provider>
        </ApiContext.Provider>
      </ThemeProvider>
    );
    const userNameInput = screen.getByLabelText(/User Name/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.change(userNameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    const loginButton = screen.getByText(/Login/i);
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(postData).toHaveBeenCalledWith(
        "mockLoginApi",
        {
          userName: "testuser",
          password: "testpassword",
        },
        null
      );
    });

    expect(mockApiContextData.setApiResponseType).toBeCalledTimes(1);
    expect(mockApiContextData.setApiResponseType).toHaveBeenCalledWith("error");
  });
});
