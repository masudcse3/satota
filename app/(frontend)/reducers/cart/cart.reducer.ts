/** @format */

import {
  ADD_ITEM,
  REMOVE_ITEM,
  UPDATE_QUANTITY,
  RESET_CART,
  UPDATE_PRICE,
} from "./cart.actionTypes";
import { type TCartItem, type TPayload } from "@/types";

export const cartReducer = (
  state: TCartItem[],
  action: { type: string; payload: TPayload }
): TCartItem[] => {
  const { type, payload } = action;
  switch (type) {
    case ADD_ITEM:
      return [...state, payload.item!];
    case REMOVE_ITEM:
      return state.filter((item) => item.id !== payload.itemId);
    case UPDATE_QUANTITY:
      return state.map((item) =>
        item.id === payload.itemId
          ? {
              ...item,
              quantity: payload.newQuantity!,
              totalPrice: item.price * payload.newQuantity!,
            }
          : item
      );
    case UPDATE_PRICE:
      return state.map((item) =>
        item.id === payload.itemId
          ? {
              ...item,
              price: payload.newPrice!,
              totalPrice: item.quantity * payload.newPrice!,
            }
          : item
      ); // reset the total price to 0 for all items

    case RESET_CART:
      return []; // reset the cart to empty array

    default:
      return state;
  }
};
