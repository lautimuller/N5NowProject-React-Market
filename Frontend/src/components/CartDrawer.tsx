import Drawer from "@mui/material/Drawer";
import React, { useContext } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import "../styles/CartDrawer.scss";
import { CartContext } from "../contexts/CartContext";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Button } from "@mui/material";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  open,
  onClose,
}) => {
  const productImg = require("../images/card.png");
  const emptyImg = require("../images/emptyCart.png");

  const { cart, clearCart, purchase } = useContext(CartContext);

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  };

  const handleRemoveFromCart = (productId: number) => {
    clearCart(productId);
  };

  const handleBuyCart = () => {
    purchase();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      classes={{ paper: "drawer-paper" }}
    >
      <div className="cart-drawer">
        <div className="close-block">
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>

        <div className="drawer-actions">
          <Typography variant="h6" className="drawer-title">
            Your Cart
          </Typography>
        </div>
        {cart.length > 0 ? (
          <>
            <List>
              {cart.map((item, index) => (
                <ListItem key={index} className="cart-item">
                  <div className="item-image">
                    <img
                      src={productImg}
                      alt={item.product.name}
                      width={30}
                      height={30}
                    />
                  </div>
                  <div className="item-info">
                    <ListItemText
                      primary={item.product.name}
                      secondary={`$${item.product.price}`}
                    />
                  </div>
                  <div className="item-quantity">
                    <Typography variant="body2" className="quantity">
                      Quantity: {item.quantity}
                    </Typography>
                  </div>
                  <div className="item-actions">
                    <DeleteOutlineIcon
                      className="delete-icon"
                      onClick={() => handleRemoveFromCart(item.product.id)}
                    />
                  </div>
                </ListItem>
              ))}
            </List>
            <Divider className="divider" />
            <div className="total">
              <Typography variant="subtitle1">
                Total: ${calculateTotal().toFixed(2)}
              </Typography>
            </div>
            <div className="buy-block">
              <Button className="buy-button" onClick={handleBuyCart}>
                Buy
              </Button>
            </div>
          </>
        ) : (
          <div className="empty-block">
            <div className="empty-block_img">
              <img src={emptyImg} alt="empty Cart" width={80} height={80} />
            </div>
            <Typography variant="body1" className="empty-cart">
              Nothing here.
            </Typography>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default CartDrawer;
