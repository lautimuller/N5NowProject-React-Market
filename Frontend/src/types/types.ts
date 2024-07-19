export interface Product {
    id: number;
    name: string;
    price: number;
    amount: number;
};

export interface CartItem {
    product: Product;
    quantity: number;
  }