import React from "react";
import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { ThemeProvider, createTheme } from "@mui/material";

describe("Dashboard", () => {
  const theme = createTheme();
  it("renders DashboardStory and DashboardKpis components", () => {
    render(
      <ThemeProvider theme={theme}>
        <Dashboard />
      </ThemeProvider>
    );

    expect(screen.getByTestId("dashboard")).toBeInTheDocument();
  });
});
