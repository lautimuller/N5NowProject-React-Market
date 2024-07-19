import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import "./styles/App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeModeProvider } from "./contexts/ThemeModeContext";

const App: React.FC = () => {

  return (
    <ThemeModeProvider>
      <CartProvider>
        <Router>
            <Header
              title="Shopping App"
            />
            <ProductList />
            <ToastContainer />
        </Router>
      </CartProvider>
    </ThemeModeProvider>
  );
};

export default App;
