import axios from "axios";
import postData from "./postData";

jest.mock("axios");

describe("postData", () => {
  it("sends a POST request with data and handles a successful response", async () => {
    const mockData = { key: "value" };
    const mockToken = "mockToken";
    (axios.post as jest.Mock).mockResolvedValue({
      data: mockData,
      headers: { "x-token": mockToken },
    });

    const result = await postData(
      "/example-api",
      { key: "requestData" },
      "token"
    );

    expect(result.isLoading).toBeFalsy();
    expect(result.data).toEqual(mockData);
    expect(result.error).toBeNull();
  });

  it("handles errors when sending a POST request", async () => {
    const errorMessage = "Request failed";
    (axios.post as jest.Mock).mockRejectedValue(new Error(errorMessage));

    // Call the postData function
    const result = await postData(
      "/example-api",
      { key: "requestData" },
      "token"
    );
    expect(result.isLoading).toBeFalsy();
    expect(result.data).toBeNull();
  });
});
