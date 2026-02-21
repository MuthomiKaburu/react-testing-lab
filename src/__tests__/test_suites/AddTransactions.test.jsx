import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../../components/App";

global.fetch = vi.fn((url, options) => {
  if (options && options.method === "POST") {
    return Promise.resolve({
      json: () =>
        Promise.resolve({
          id: 99,
          description: "Test Item",
          amount: 100,
          category: "Test",
          date: "2024-01-01",
        }),
    });
  }

  return Promise.resolve({
    json: () => Promise.resolve([]),
  });
});

describe("Add Transactions", () => {
  test("adds new transaction to frontend", async () => {
    render(<App />);

    fireEvent.change(screen.getByPlaceholderText(/description/i), {
      target: { value: "Test Item" },
    });

    fireEvent.change(screen.getByPlaceholderText(/amount/i), {
      target: { value: "100" },
    });

    fireEvent.change(screen.getByPlaceholderText(/category/i), {
      target: { value: "Test" },
    });

    fireEvent.change(screen.getByPlaceholderText(/date/i), {
      target: { value: "2024-01-01" },
    });

    fireEvent.click(screen.getByRole("button", { name: /add/i }));

    await waitFor(() => {
      expect(screen.getByText(/Test Item/i)).toBeInTheDocument();
    });
  });

  test("post request was called", async () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /add/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });
  });
});