import { render, screen, fireEvent } from "@testing-library/react";
import App from "../../components/App";

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          id: 1,
          description: "Rent",
          amount: 500,
          category: "Housing",
          date: "2024-01-01",
        },
        {
          id: 2,
          description: "Groceries",
          amount: 50,
          category: "Food",
          date: "2024-01-02",
        },
      ]),
  })
);

describe("Search and Sort", () => {
  test("change event updates search results", async () => {
    render(<App />);

    const searchInput = await screen.findByPlaceholderText(/search/i);

    fireEvent.change(searchInput, {
      target: { value: "Rent" },
    });

    expect(await screen.findByText(/Rent/i)).toBeInTheDocument();
  });
});