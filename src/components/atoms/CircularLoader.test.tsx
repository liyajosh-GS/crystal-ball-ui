import { render, screen } from "@testing-library/react";
import CircularLoader from "./CircularLoader";

describe("CircularLoader", () => {
  it("renders the CircularLoader component", () => {
    render(<CircularLoader />);
    const circularLoader = screen.getByTestId("circular-loader");
    expect(circularLoader).toBeInTheDocument();
  });

  it("applies the specified CSS styles", () => {
    render(<CircularLoader />);
    const circularLoader = screen.getByTestId("circular-loader");
    expect(circularLoader).toHaveStyle({
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
    });
  });
});
