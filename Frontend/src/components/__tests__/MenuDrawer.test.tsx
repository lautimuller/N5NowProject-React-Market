import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { ThemeModeProvider } from "../../contexts/ThemeModeContext";
import MenuDrawer from "../MenuDrawer";

jest.mock("../AddProductModal.tsx", () => () => <div data-testid="add-product-modal" />);

const renderWithProviders = (ui: React.ReactElement, { ...options } = {}) => {
  return render(<ThemeModeProvider>{ui}</ThemeModeProvider>, options);
};

describe("MenuDrawer Component", () => {
  const handleClose = jest.fn();

  beforeEach(() => {
    renderWithProviders(<MenuDrawer open={true} onClose={handleClose} />);
  });

  test("renders drawer with title", () => {
    expect(screen.getByTestId("drawer-title")).toHaveTextContent("Shopping Menu");
  });

  test("calls onClose when close button is clicked", () => {
    fireEvent.click(screen.getByTestId("close-button"));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test("renders 'Add Product' item", () => {
    expect(screen.getByTestId("add-product-text")).toHaveTextContent("Add Product");
  });

  test("opens AddProductModal when 'Add Product' button is clicked", () => {
    fireEvent.click(screen.getByTestId("add-product-button"));
    expect(screen.getByTestId("add-product-modal")).toBeInTheDocument();
  });

  test("toggles dark mode when dark mode button is clicked", () => {
    const darkModeButton = screen.getByTestId("dark-mode-button");
    fireEvent.click(darkModeButton);
    expect(screen.getByTestId("dark-mode-text")).toHaveTextContent("Dark mode activated");

    fireEvent.click(darkModeButton);
    expect(screen.getByTestId("dark-mode-text")).toHaveTextContent("Dark mode disabled");
  });
});
