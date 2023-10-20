import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProjectCreationForm from "./ProjectCreationForm";
import { ApiContext } from "../../../contexts/ApiContext"; // Replace with the correct import for your context
import { CREATE_PROJECT_API_KEY } from "../../../constants/constant";
import postData from "../../../repositories/postData";
import { AlertColor, ThemeProvider, createTheme } from "@mui/material";
import { AppContext } from "../../../contexts/AppContext";

// Mock the context data
const mockApiConfig = {
  [CREATE_PROJECT_API_KEY]: "mockCreateProjectApi",
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

describe("ProjectCreationForm", () => {
  const theme = createTheme();
  it("renders project creation form", () => {
    render(
      <ThemeProvider theme={theme}>
        <ApiContext.Provider value={mockApiContextData}>
          <AppContext.Provider value={mockAppContextData}>
            <ProjectCreationForm
              onSuccessCallback={() => {}}
              setSharedResources={() => {}}
              sharedResources={{ projectId: 1 }}
            />
          </AppContext.Provider>
        </ApiContext.Provider>
      </ThemeProvider>
    );

    // Check if the project creation form elements are rendered
    const projectNameInput = screen.getByLabelText(/Project Name/i);
    const descriptionInput = screen.getByLabelText(/Description/i);
    const targetFundInput = screen.getByLabelText(/Amount required/i);
    const registerButton = screen.getByText(/Register Project/i);

    expect(projectNameInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(targetFundInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  it("handles successful project creation", async () => {
    const mockResponse = { error: null, data: { id: 123 } };

    (postData as jest.Mock).mockResolvedValueOnce(mockResponse);
    render(
      <ThemeProvider theme={theme}>
        <ApiContext.Provider value={mockApiContextData}>
          <AppContext.Provider value={mockAppContextData}>
            <ProjectCreationForm
              onSuccessCallback={jest.fn()}
              setSharedResources={jest.fn()}
              sharedResources={{ projectId: 1 }}
            />
          </AppContext.Provider>
        </ApiContext.Provider>
      </ThemeProvider>
    );

    // Mock user input
    const projectNameInput = screen.getByLabelText(/Project Name/i);
    const descriptionInput = screen.getByLabelText(/Description/i);
    const targetFundInput = screen.getByLabelText(/Amount required/i);

    fireEvent.change(projectNameInput, { target: { value: "Project X" } });
    fireEvent.change(descriptionInput, {
      target: { value: "A great project" },
    });
    fireEvent.change(targetFundInput, { target: { value: "10000" } });
    const registerButton = screen.getByText(/Register Project/i);
    fireEvent.click(registerButton);
    await waitFor(() => {
      expect(postData).toHaveBeenCalledWith(
        "mockCreateProjectApi",
        {
          name: "Project X",
          description: "A great project",
          targetFund: "10000",
          projectType: "",
          groupMembers: [],
        },
        null
      );
    });
  });

  it("handles project creation error", async () => {
    const mockError = "Project creation failed.";

    const mockResponse = { error: mockError };

    (postData as jest.Mock).mockResolvedValueOnce(mockResponse);

    render(
      <ThemeProvider theme={theme}>
        <ApiContext.Provider value={mockApiContextData}>
          <AppContext.Provider value={mockAppContextData}>
            <ProjectCreationForm
              onSuccessCallback={() => {}}
              setSharedResources={() => {}}
              sharedResources={{ projectId: 1 }}
            />
          </AppContext.Provider>
        </ApiContext.Provider>
      </ThemeProvider>
    );

    // Mock the API request by clicking the /Register Project/i button
    const registerButton = screen.getByText(/Register Project/i);
    fireEvent.click(registerButton);

    // Wait for the API response handling
    await waitFor(() => {
      expect(postData).toHaveBeenCalledWith(
        "mockCreateProjectApi",
        expect.any(Object),
        null
      );
    });

    // Check if the error message is displayed
    expect(mockApiContextData.setApiResponseType).toBeCalledTimes(1);
    expect(mockApiContextData.setApiResponseType).toHaveBeenCalledWith("error");
  });
});
