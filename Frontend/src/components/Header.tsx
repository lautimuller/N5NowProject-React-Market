import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";
import CartDrawer from "./CartDrawer";
import { CartContext } from "../contexts/CartContext";
import "../styles/Header.scss";
import MenuDrawer from "./MenuDrawer";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { cart } = useContext(CartContext);
  const [openCartDrawer, setOpenCartDrawer] = useState(false);
  const [openLeftDrawer, setOpenLeftDrawer] = useState(false);

  const handleCartDrawerOpen = () => {
    setOpenCartDrawer(true);
  };

  const handleCartDrawerClose = () => {
    setOpenCartDrawer(false);
  };

  const handleLeftDrawerOpen = () => {
    setOpenLeftDrawer(true);
  };

  const handleLeftDrawerClose = () => {
    setOpenLeftDrawer(false);
  };

  return (
    <div className="header" data-testid="header">
      <AppBar position="static">
        <Toolbar className="header">
          <IconButton
            color="inherit"
            onClick={handleLeftDrawerOpen}
            data-testid="menu-icon"
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            data-testid="header-title"
          >
            {title}
          </Typography>
          <IconButton
            color="inherit"
            aria-label="shopping cart"
            onClick={handleCartDrawerOpen}
            data-testid="cart-icon"
          >
            <Badge badgeContent={cart.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <CartDrawer open={openCartDrawer} onClose={handleCartDrawerClose} />
      <MenuDrawer open={openLeftDrawer} onClose={handleLeftDrawerClose} />
    </div>
  );
};

export default Header;
