import React from 'react';
import '../styles/CartItem.scss';
import { Product } from '../types/types';

interface CartItemProps {
  item: {
    product: Product;
    quantity: number;
  };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  return (
    <div className="cart-item">
      <div>
        <h4>{item.product.name}</h4>
        <p>Quantity: {item.quantity}</p>
        <p>Price: ${item.product.price}</p>
      </div>
    </div>
  );
};

export default CartItem;
