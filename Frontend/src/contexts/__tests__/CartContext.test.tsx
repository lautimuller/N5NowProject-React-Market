import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { CartContext } from "../CartContext";

const mockCartContext = {
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
  products: [
    { id: 1, name: "Product 1", price: 100, amount: 10 },
    { id: 2, name: "Product 2", price: 200, amount: 5 },
  ],
  addToCart: jest.fn(),
  clearCart: jest.fn(),
  purchase: jest.fn(),
  addProduct: jest.fn(),
  fetchProducts: jest.fn(),
};

const TestComponent: React.FC = () => {
  const context = React.useContext(CartContext);

  if (!context) return null;

  return (
    <div>
      <button
        data-testid="add-to-cart"
        onClick={() =>
          context.addToCart(
            { id: 1, name: "Test Product", price: 100, amount: 10 },
            1
          )
        }
      >
        Add to Cart
      </button>
      <button data-testid="clear-cart" onClick={() => context.clearCart(1)}>
        Clear Cart
      </button>
      <button data-testid="purchase" onClick={() => context.purchase()}>
        Purchase
      </button>
      <button
        data-testid="add-product"
        onClick={() =>
          context.addProduct({ name: "New Product", price: 150, amount: 20 })
        }
      >
        Add Product
      </button>
      <button
        data-testid="fetch-products"
        onClick={() => context.fetchProducts()}
      >
        Fetch Products
      </button>
      <div data-testid="cart-items">{context.cart.length}</div>
      <div data-testid="products-length">{context.products.length}</div>
    </div>
  );
};

describe("CartProvider", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("should initialize context values correctly", () => {
    render(
      <CartContext.Provider value={mockCartContext}>
        <TestComponent />
      </CartContext.Provider>
    );

    expect(screen.getByTestId("cart-items")).toHaveTextContent("2");
    expect(screen.getByTestId("products-length")).toHaveTextContent("2");
  });

  test("should add product to cart", async () => {
    render(
      <CartContext.Provider value={mockCartContext}>
        <TestComponent />
      </CartContext.Provider>
    );

    const addToCartButton = screen.getByTestId("add-to-cart");
    act(() => {
      addToCartButton.click();
    });

    expect(mockCartContext.addToCart).toHaveBeenCalledWith(
      { id: 1, name: "Test Product", price: 100, amount: 10 },
      1
    );
  });

  test("should clear product from cart", async () => {
    render(
      <CartContext.Provider value={mockCartContext}>
        <TestComponent />
      </CartContext.Provider>
    );

    const clearCartButton = screen.getByTestId("clear-cart");
    act(() => {
      clearCartButton.click();
    });

    expect(mockCartContext.clearCart).toHaveBeenCalledWith(1);
  });

  test("should handle purchase and update products", async () => {
    const updatedProducts = [
      { id: 1, name: "Product 1", price: 100, amount: 10 },
    ];
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => updatedProducts,
    } as Response);

    render(
      <CartContext.Provider value={mockCartContext}>
        <TestComponent />
      </CartContext.Provider>
    );

    const purchaseButton = screen.getByTestId("purchase");
    act(() => {
      purchaseButton.click();
    });

    await act(async () => {
      await screen.findByTestId("products-length");
    });

    expect(screen.getByTestId("products-length")).toHaveTextContent("2");
  });

  test("should add new product and update products", async () => {
    const newProduct = { id: 3, name: "New Product", price: 150, amount: 20 };
    const updatedProducts = [
      { id: 1, name: "Product 1", price: 100, amount: 10 },
      newProduct,
    ];
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => updatedProducts,
    } as Response);

    render(
      <CartContext.Provider value={mockCartContext}>
        <TestComponent />
      </CartContext.Provider>
    );

    const addProductButton = screen.getByTestId("add-product");
    act(() => {
      addProductButton.click();
    });

    await act(async () => {
      await screen.findByTestId("products-length");
    });

    expect(screen.getByTestId("products-length")).toHaveTextContent("2");
  });

  test("should fetch products on mount", async () => {
    const fetchedProducts = [
      { id: 1, name: "Product 1", price: 100, amount: 10 },
    ];
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => fetchedProducts,
    } as Response);

    render(
      <CartContext.Provider value={mockCartContext}>
        <TestComponent />
      </CartContext.Provider>
    );

    await act(async () => {
      await screen.findByTestId("products-length");
    });

    expect(screen.getByTestId("products-length")).toHaveTextContent("2");
  });
});
