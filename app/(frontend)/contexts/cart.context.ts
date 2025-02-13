/** @format */

import { createContext, Dispatch, useContext } from "react";
import { type TCartItem, type TPayload } from "@/types";

type TCartContext = {
  cart: TCartItem[];
  dispatch: Dispatch<{ type: string; payload: TPayload }>;
};
export const CartContext = createContext<TCartContext | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartContext");
  }
  return context;
};
