import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ProductList from "../ProductList";
import { CartContext, CartContextProps } from "../../contexts/CartContext";
import { ThemeModeProvider } from "../../contexts/ThemeModeContext";

const mockCartContext: CartContextProps = {
  cart: [
    {
      product: { id: 1, name: "Product 1", price: 100, amount: 10 },
      quantity: 2,
    },
    {
      product: { id: 2, name: "Product 2", price: 200, amount: 5 },
      quantity: 1,
    },
  ],
  addToCart: jest.fn(),
  clearCart: jest.fn(),
  purchase: jest.fn(),
  products: [
    { id: 1, name: "Product 1", price: 100, amount: 10 },
    { id: 2, name: "Product 2", price: 200, amount: 5 },
  ],
  addProduct: jest.fn(),
  fetchProducts: jest.fn(),
};

const renderWithProviders = (ui: React.ReactElement, { ...options } = {}) => {
  return render(
    <ThemeModeProvider>
      <CartContext.Provider value={mockCartContext}>{ui}</CartContext.Provider>
    </ThemeModeProvider>,
    options
  );
};

test("renders ProductList component with products", () => {
  const { getByTestId, getAllByTestId } = renderWithProviders(<ProductList />);

  const productListElement = getByTestId("product-list");
  const productCardElements = getAllByTestId("product-card");

  expect(productListElement).toBeInTheDocument();
  expect(productCardElements.length).toBe(mockCartContext.cart.length);
});
