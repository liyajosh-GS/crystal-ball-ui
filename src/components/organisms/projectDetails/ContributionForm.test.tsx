import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContributionForm from "./ContributionForm";
import { CREATE_CONTRIBUTION_API_KEY } from "../../../constants/constant";
import postData from "../../../repositories/postData";
import { AlertColor, ThemeProvider, createTheme } from "@mui/material";
import { ApiContext } from "../../../contexts/ApiContext";
import { AppContext } from "../../../contexts/AppContext";

const mockApiConfig = {
  [CREATE_CONTRIBUTION_API_KEY]: "mockCreateContributionApi",
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
describe("ContributionForm", () => {
  const theme = createTheme();
  it("renders contribution form", () => {
    render(
      <ThemeProvider theme={theme}>
        <ApiContext.Provider value={mockApiContextData}>
          <AppContext.Provider value={mockAppContextData}>
            <ContributionForm projectId={"123"} />
          </AppContext.Provider>
        </ApiContext.Provider>
      </ThemeProvider>
    );

    const contributeButton = screen.getByText(/Contribute/i);
    expect(contributeButton).toBeInTheDocument();
  });

  it("handles successful contribution", async () => {
    const mockResponse = { error: null };

    (postData as jest.Mock).mockResolvedValueOnce(mockResponse);

    render(
      <ThemeProvider theme={theme}>
        <ApiContext.Provider value={mockApiContextData}>
          <AppContext.Provider value={mockAppContextData}>
            <ContributionForm projectId={"123"} />
          </AppContext.Provider>
        </ApiContext.Provider>
      </ThemeProvider>
    );

    const contributeButton = screen.getByText(/Contribute/i);
    fireEvent.click(contributeButton);

    const amountInput = screen.getByLabelText(/Amount/i);
    fireEvent.change(amountInput, { target: { value: "50" } });

    const confirmButton = screen.getByText(/Confirm/i);
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(postData).toHaveBeenCalledWith(
        "mockCreateContributionApi",
        {
          projectId: "123",
          amount: 50,
        },
        null
      );
    });
    expect(mockApiContextData.setApiResponseType).toBeCalledTimes(1);
    expect(mockApiContextData.setApiResponseType).toHaveBeenCalledWith(
      "success"
    );
  });

  it("handles contribution error", async () => {
    const mockError = "Contribution failed.";

    const mockResponse = { error: mockError };

    (postData as jest.Mock).mockResolvedValueOnce(mockResponse);

    render(
      <ThemeProvider theme={theme}>
        <ApiContext.Provider value={mockApiContextData}>
          <AppContext.Provider value={mockAppContextData}>
            <ContributionForm projectId={"123"} />
          </AppContext.Provider>
        </ApiContext.Provider>
      </ThemeProvider>
    );

    const contributeButton = screen.getByText(/Contribute/i);
    fireEvent.click(contributeButton);

    const confirmButton = screen.getByText(/Confirm/i);
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(postData).toHaveBeenCalledWith(
        "mockCreateContributionApi",
        expect.any(Object),
        null
      );
    });

    expect(mockApiContextData.setApiResponseType).toBeCalledTimes(1);
    expect(mockApiContextData.setApiResponseType).toHaveBeenCalledWith("error");
  });
});
