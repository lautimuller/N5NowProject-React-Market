import React, { createContext, useState, useEffect, ReactNode } from "react";
import { CartItem, Product } from "../types/types";
import { notify } from "../components/CustomToast";

export interface CartContextProps {
  cart: CartItem[];
  products: Product[];
  addToCart: (product: Product, quantity: number) => void;
  clearCart: (id: number) => void;
  purchase: () => void;
  addProduct: (newProduct: Omit<Product, "id">) => void;
  fetchProducts: () => void;
}

export const CartContext = createContext<CartContextProps>({
  cart: [],
  products: [],
  addToCart: (product: Product, quantity: number) => {},
  clearCart: (id: number) => {},
  purchase: () => {},
  addProduct: (newProduct: Omit<Product, "id">) => {},
  fetchProducts: () => {},
});

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const apiURL = "http://localhost:3001";

  const storedCart = localStorage.getItem("cart");

  const [cart, setCart] = useState<CartItem[]>(
    storedCart && JSON.parse(storedCart)
  );
  const [products, setProducts] = useState<Product[]>([]);

  const addToCart = (product: Product, quantity: number) => {
    const existingItemIndex = cart.findIndex(
      (item) => item.product.id === product.id
    );
    const existingQuantity =
      existingItemIndex !== -1 ? cart[existingItemIndex].quantity : 0;
    const totalQuantity = existingQuantity + quantity;

    if (totalQuantity > product.amount) {
      notify(`There isn't enough stock of ${product.name}.`, "error");
      return;
    }

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      setCart((prev) => [...prev, { product, quantity }]);
    }

    notify(`${product.name} added successfully.`, "success");
  };

  const clearCart = (itemId: number) => {
    const updatedCart = cart.filter((item) => item.product.id !== itemId);
    setCart(updatedCart);
  };

  const purchase = async () => {
    try {
      const response = await fetch(`${apiURL}/api/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart }),
      });

      if (!response.ok) {
        throw new Error("Error purchasing items");
      }

      const updatedProducts = await response.json();
      setProducts(updatedProducts);
      setCart([]);

      notify("Purchase made successfully", "success");
    } catch (error) {
      console.error(error);
      notify("Error making purchase", "error");
    }
  };

  const addProduct = async (newProduct: Omit<Product, "id">) => {
    try {
      const response = await fetch(`${apiURL}/api/add-product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newProduct }),
      });

      if (!response.ok) {
        throw new Error("Error adding product");
      }

      const updatedProducts = await response.json();
      setProducts(updatedProducts);

      notify("Product added successfully", "success");
    } catch (error) {
      console.error(error);
      notify("Error adding product", "error");
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${apiURL}/api/products`);
      if (!response.ok) {
        throw new Error("Error fetching products");
      }
      const products = await response.json();
      setProducts(products);
    } catch (error) {
      console.error(error);
      notify("Error fetching products", "error");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        products,
        addToCart,
        clearCart,
        purchase,
        addProduct,
        fetchProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
