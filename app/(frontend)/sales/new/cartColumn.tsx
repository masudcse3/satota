/** @format */

"use client";
import { ColumnDef } from "@tanstack/react-table";
import { TCartItem } from "@/types";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  REMOVE_ITEM,
  UPDATE_PRICE,
  UPDATE_QUANTITY,
} from "../../reducers/cart/cart.actionTypes";
import { useCart } from "../../contexts/cart.context";
import EditableCell from "@/components/global/editableCell"; // Import the custom EditableCell component

export const useCartColumns = () => {
  const { dispatch } = useCart();

  const handleUpdateQuantity = (itemId: number, newQuantity: number) => {
    dispatch({
      type: UPDATE_QUANTITY,
      payload: { itemId, newQuantity },
    });
  };

  const handleUpdatePrice = (itemId: number, newPrice: number) => {
    dispatch({
      type: UPDATE_PRICE,
      payload: { itemId, newPrice },
    });
  };

  const handleDelete = (itemId: number) => {
    dispatch({
      type: REMOVE_ITEM,
      payload: { itemId },
    });
  };

  const columns: ColumnDef<TCartItem>[] = [
    {
      id: "id",
      header: "S.No",
      cell: ({ row }) => {
        const index = row.index + 1;
        return <p className="w-16">{index}</p>;
      },
    },
    {
      id: "product",
      header: "Product",
      cell: ({ row }) => {
        const { name, weight, unit } = row.original;
        return <p>{`${name} (${weight}${unit})`}</p>;
      },
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }) => {
        const quantity = row.original.quantity;
        return (
          <EditableCell
            value={quantity}
            onSave={(newQuantity: number) =>
              handleUpdateQuantity(row.original.id, newQuantity)
            }
          />
        );
      },
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const price = row.original.price;
        return (
          <EditableCell
            value={price}
            onSave={(newPrice: number) =>
              handleUpdatePrice(row.original.id, newPrice)
            }
          />
        );
      },
    },
    {
      accessorKey: "totalPrice",
      header: "Total Price",
      cell: ({ row }) => {
        const totalPrice = row.original.quantity * row.original.price;
        return <p>{totalPrice}</p>;
      },
    },
    {
      id: "delete",
      header: "Delete",
      cell: ({ row }) => {
        const id = row.original.id;
        return (
          <Button onClick={() => handleDelete(id)} variant="link">
            <Trash />
          </Button>
        );
      },
    },
  ];

  return columns;
};
