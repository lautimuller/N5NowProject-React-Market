import React, { useContext, useState } from "react";
import "../styles/ProductCard.scss";
import { CartContext } from "../contexts/CartContext";
import { Product } from "../types/types";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

interface ProductCardProps {
  product: Product;
  darkMode?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, darkMode = false }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  const imgBackground = require("../images/productBackground.png");

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(product, quantity);
      setQuantity(1);
    }
  };

  return (
    <Card className={`product-card ${darkMode ? 'dark-mode' : ''}`}>
      <CardMedia
        component="img"
        height={200}
        width={150}
        image={imgBackground}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color={`${darkMode ? 'text.primary' : ''}`}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Typography>
      </CardContent>
      <CardActions className="card-actions">
        <Typography variant="h6" component="div">
          ${product.price}
        </Typography>
        <div className="actions-right">
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min={1}
            max={product.amount}
            className="input-no-border"
          />
          <Button
            variant="contained"
            className="button-add"
            startIcon={<AddShoppingCartIcon />}
            onClick={handleAddToCart}
            data-testid="add-to-cart-button"
          >
            Add to Cart
          </Button>
        </div>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
