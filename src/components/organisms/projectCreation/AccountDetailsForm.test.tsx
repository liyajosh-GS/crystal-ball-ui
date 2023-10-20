import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ApiContext } from "../../../contexts/ApiContext"; // Replace with the correct import for your context
import { BANK_API_KEY } from "../../../constants/constant";
import postData from "../../../repositories/postData";
import { AlertColor, ThemeProvider, createTheme } from "@mui/material";
import { AppContext } from "../../../contexts/AppContext";
import AccountDetailsForm from "./AccountDetailsForm";

// Mock the context data
const mockApiConfig = {
  [BANK_API_KEY]: "mockBankApi",
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

describe("AccountDetailsForm", () => {
  const theme = createTheme();
  it("renders account details form", () => {
    render(
      <ThemeProvider theme={theme}>
        <ApiContext.Provider value={mockApiContextData}>
          <AppContext.Provider value={mockAppContextData}>
            <AccountDetailsForm
              sharedResources={{ projectId: 123 }}
              onSuccessCallback={jest.fn()}
              setSharedResources={jest.fn()}
            />
          </AppContext.Provider>
        </ApiContext.Provider>
      </ThemeProvider>
    );

    // Check if the account details form elements are rendered
    const accountNumberInput = screen.getByLabelText(/Bank Account Number/i);
    const reEnterAccountInput = screen.getByLabelText(
      /Re-enter Account Number/i
    );
    const ifscCodeInput = screen.getByLabelText(/Bank IFSC Code/i);
    const accountHolderNameInput = screen.getByLabelText(
      /Account Holder's Name/i
    );
    const saveButton = screen.getByText(/Save Bank Info/i);

    expect(accountNumberInput).toBeInTheDocument();
    expect(reEnterAccountInput).toBeInTheDocument();
    expect(ifscCodeInput).toBeInTheDocument();
    expect(accountHolderNameInput).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  });

  it("handles successful bank details submission", async () => {
    const mockResponse = { error: null };

    (postData as jest.Mock).mockResolvedValueOnce(mockResponse);

    render(
      <ThemeProvider theme={theme}>
        <ApiContext.Provider value={mockApiContextData}>
          <AppContext.Provider value={mockAppContextData}>
            <AccountDetailsForm
              sharedResources={{ projectId: 123 }}
              onSuccessCallback={jest.fn()}
              setSharedResources={jest.fn()}
            />
          </AppContext.Provider>
        </ApiContext.Provider>
      </ThemeProvider>
    );

    // Mock user input
    const accountNumberInput = screen.getByLabelText(/Bank Account Number/i);
    const reEnterAccountInput = screen.getByLabelText(
      /Re-enter Account Number/i
    );
    const ifscCodeInput = screen.getByLabelText(/Bank IFSC Code/i);
    const accountHolderNameInput = screen.getByLabelText(
      /Account Holder's Name/i
    );

    fireEvent.change(accountNumberInput, { target: { value: "1234567890" } });
    fireEvent.change(reEnterAccountInput, { target: { value: "1234567890" } });
    fireEvent.change(ifscCodeInput, { target: { value: "ABC12345" } });
    fireEvent.change(accountHolderNameInput, { target: { value: "John Doe" } });

    // Mock the API request by clicking the /Save Bank Info/i button
    const saveButton = screen.getByText(/Save Bank Info/i);
    fireEvent.click(saveButton);

    // Wait for the API response handling
    await waitFor(() => {
      expect(postData).toHaveBeenCalledWith(
        "mockBankApi",
        {
          accountNumber: "1234567890",
          code: "ABC12345",
          accountHolder: "John Doe",
          projectId: 123,
        },
        null
      );
    });

    // Add your assertions for successful bank details submission, such as redirection or success message
  });

  it("handles bank details submission error", async () => {
    const mockError = "Bank details submission failed.";

    const mockResponse = { error: mockError };

    (postData as jest.Mock).mockResolvedValueOnce(mockResponse);

    render(
      <ThemeProvider theme={theme}>
        <ApiContext.Provider value={mockApiContextData}>
          <AppContext.Provider value={mockAppContextData}>
            <AccountDetailsForm
              sharedResources={{ projectId: 123 }}
              onSuccessCallback={jest.fn()}
              setSharedResources={jest.fn()}
            />
          </AppContext.Provider>
        </ApiContext.Provider>
      </ThemeProvider>
    );

    // Mock user input
    const accountNumberInput = screen.getByLabelText(/Bank Account Number/i);
    const reEnterAccountInput = screen.getByLabelText(
      /Re-enter Account Number/i
    );
    const ifscCodeInput = screen.getByLabelText(/Bank IFSC Code/i);
    const accountHolderNameInput = screen.getByLabelText(
      /Account Holder's Name/i
    );

    fireEvent.change(accountNumberInput, { target: { value: "1234567890" } });
    fireEvent.change(reEnterAccountInput, { target: { value: "1234567890" } });
    fireEvent.change(ifscCodeInput, { target: { value: "ABC12345" } });
    fireEvent.change(accountHolderNameInput, { target: { value: "John Doe" } });

    const saveButton = screen.getByTestId("saveBankInfo");
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(postData).toHaveBeenCalledWith(
        "mockBankApi",
        {
          accountNumber: "1234567890",
          code: "ABC12345",
          accountHolder: "John Doe",
          projectId: 123,
        },
        null
      );
    });

    // Check if the error message is displayed
    expect(mockApiContextData.setApiResponseType).toBeCalledTimes(1);
    expect(mockApiContextData.setApiResponseType).toHaveBeenCalledWith("error");
  });
});
