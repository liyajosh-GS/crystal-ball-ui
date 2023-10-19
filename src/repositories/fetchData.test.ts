import axios from "axios";
import fetchData from "./fetchData";

jest.mock("axios"); // Mock the axios module

describe("fetchData", () => {
  it("fetches successfully data from an API", async () => {
    const mockData = { key: "value" };
    const response = { data: mockData };
    (axios.get as jest.Mock).mockResolvedValue(response);

    const result = await fetchData("/example-api");
    expect(result.isLoading).toBeFalsy();
    expect(result.data).toEqual(mockData);
    expect(result.error).toBeNull();
  });

  it("handles errors when fetching data", async () => {
    const errorMessage = "Network Error";
    (axios.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const result = await fetchData("/example-api");

    expect(result.isLoading).toBeFalsy();
    expect(result.data).toBeNull();
    expect(result.error).toEqual(new Error(errorMessage));
  });
});
