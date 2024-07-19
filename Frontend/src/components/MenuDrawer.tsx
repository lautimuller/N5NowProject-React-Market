import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "../styles/MenuDrawer.scss";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { AddBoxOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material";
import AddProductModal from "./AddProductModal";
import { useDarkMode } from "../contexts/ThemeModeContext";

interface LeftDrawerProps {
  open: boolean;
  onClose: () => void;
}

const MenuDrawer: React.FC<LeftDrawerProps> = ({ open, onClose }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();

  const handleAddProductClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      classes={{ paper: "left-drawer-paper" }}
      data-testid="menu-drawer"
    >
      <div className={`left-drawer ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <div className="drawer-header">
          <Typography
            variant="h6"
            className="title-menu"
            data-testid="drawer-title"
          >
            Shopping Menu
          </Typography>
          <IconButton onClick={onClose} data-testid="close-button" className={darkMode ? 'dark-mode' : 'light-mode'}>
            <CloseIcon className={darkMode ? 'dark-mode' : 'light-mode'}/>
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem data-testid="add-product-item">
            <ListItemText
              primary="Add Product"
              data-testid="add-product-text"
            />
            <IconButton
              color="inherit"
              onClick={handleAddProductClick}
              data-testid="add-product-button"
              className={darkMode ? 'dark-mode' : 'light-mode'}
            >
              <AddBoxOutlined />
            </IconButton>
          </ListItem>
          <ListItem data-testid="dark-mode-item">
            <ListItemText
              primary={darkMode ? "Dark mode activated" : "Dark mode disabled"}
              data-testid="dark-mode-text"
            />
            <IconButton
              color="inherit"
              onClick={toggleDarkMode}
              data-testid="dark-mode-button"
              className={darkMode ? 'dark-mode' : 'light-mode'}
            >
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </ListItem>
        </List>
      </div>
      <AddProductModal open={isModalOpen} onClose={handleCloseModal} />
    </Drawer>
  );
};

export default MenuDrawer;
