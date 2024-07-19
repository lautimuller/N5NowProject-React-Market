import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from '../Header';
import { ThemeModeProvider } from '../../contexts/ThemeModeContext'; 

const renderWithProviders = (ui: React.ReactElement, { ...options } = {}) => {
  return render(<ThemeModeProvider>{ui}</ThemeModeProvider>, options);
};

test('renders Header component correctly', () => {
  const { getByTestId } = renderWithProviders(
    <Header title="Test Title" />
  );

  const headerElement = getByTestId('header');
  const menuIconButton = getByTestId('menu-icon');
  const headerTitleElement = getByTestId('header-title');
  const cartIconButton = getByTestId('cart-icon');

  expect(headerElement).toBeInTheDocument();
  expect(menuIconButton).toBeInTheDocument();
  expect(headerTitleElement.textContent).toBe('Test Title');
  expect(cartIconButton).toBeInTheDocument();

  act(() => {
    fireEvent.click(menuIconButton);
    fireEvent.click(cartIconButton);
  });
});
