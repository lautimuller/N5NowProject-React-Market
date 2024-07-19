import React, { useContext } from "react";
import ProductCard from "./ProductCard";
import "../styles/ProductList.scss";
import { Product } from "../types/types";
import { Grid } from "@mui/material";
import { CartContext } from "../contexts/CartContext";
import { useDarkMode } from "../contexts/ThemeModeContext";

const ProductList: React.FC = () => {
  const { products } = useContext(CartContext);
  const { darkMode } = useDarkMode();

  return (
    <div
      className={`product-list ${darkMode ? "dark-mode" : "light-mode"}`}
      data-testid="product-list"
    >
      <Grid container spacing={3} p={4}>
        {products.map((product: Product) => (
          <Grid
            item
            key={product.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            data-testid="product-card"
          >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductList;
