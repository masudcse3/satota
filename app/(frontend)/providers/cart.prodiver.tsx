/** @format */
"use client";
import React, { ReactNode, useReducer } from "react";
import { cartReducer } from "../reducers/cart/cart.reducer";
import { CartContext } from "../contexts";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
