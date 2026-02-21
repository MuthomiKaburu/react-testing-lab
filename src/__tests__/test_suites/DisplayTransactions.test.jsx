import { render, screen, waitFor } from "@testing-library/react";
import App from "../../components/App";

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          id: 1,
          description: "Groceries",
          amount: 50,
          category: "Food",
          date: "2024-01-01",
        },
      ]),
  })
);

describe("Display Transactions", () => {
  test("transactions are displayed on startup", async () => {
    render(<App />);

    const item = await screen.findByText(/Groceries/i);

    expect(item).toBeInTheDocument();
  });
});