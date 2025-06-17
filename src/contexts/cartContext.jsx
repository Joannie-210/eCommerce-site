import React, { createContext, useState, useContext } from "react";

// Create the cart context
const CartContext = createContext();


export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {

    setCartItems((prevItems) => [...prevItems, product]);
  };

  const cartCount = cartItems.length;

  return (
    <CartContext.Provider value={{ cartItems, addToCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => useContext(CartContext);
