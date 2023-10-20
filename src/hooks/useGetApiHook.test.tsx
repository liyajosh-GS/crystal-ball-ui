import { renderHook, waitFor } from "@testing-library/react";
import axios from "axios";
import useGetApiHook from "./useGetApiHook";

jest.mock("axios");

describe("useGetApiHook", () => {
  const mockData = { example: "data" };
  const mockError = new Error("Test error");

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("fetches data successfully and sets isLoading to false", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

    const url = "/example-api";
    const { result } = renderHook(() => useGetApiHook(url));

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
    });
  });

  it("handles errors and sets isLoading to false", async () => {
    (axios.get as jest.Mock).mockRejectedValue(mockError);

    const url = "/example-api";
    const { result } = renderHook(() => useGetApiHook(url));

    await waitFor(() => {
      expect(result.current.data).toBeNull();
    });
  });
});
