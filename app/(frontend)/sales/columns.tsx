/** @format */

"use client";
import { ColumnDef } from "@tanstack/react-table";
import { type TOrder } from "@/types";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { formatDate } from "@/utils/date";
export const columns: ColumnDef<TOrder>[] = [
  {
    accessorKey: "updatedAt",
    header: "Date",
    cell: ({ row }) => {
      const date = row.original.updatedAt;

      return <p className="w-16">{formatDate(date)}</p>;
    },
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => {
      const customer = row.original.customer;

      return (
        <p>
          {customer.name} <br />({customer.address})
        </p>
      );
    },
  },
  {
    accessorKey: "cart",
    header: "Orders",
    cell: ({ row }) => {
      const cart = row.original.cart;
      return (
        <ol className="list-decimal">
          {cart.map((item) => {
            const product = item.product;
            return (
              <li key={product.name} className="mb-1">
                {product.name} ({product.weight}
                {product.unit})<br />
                {item.quantity} x {item.price} ={" "}
                {item.totalPrice.toLocaleString("en-US")}
              </li>
            );
          })}
        </ol>
      );
    },
  },
  {
    accessorKey: "total",
    header: "Total Amount",
    cell: ({ row }) => {
      const total = row.original.total;
      return <p>{total.toLocaleString("en-BD")}</p>;
    },
  },
  {
    accessorKey: "discount",
    header: "Discount",
    cell: ({ row }) => {
      const discount = row.original.discount;
      return <p>{discount.toLocaleString("en-BD")}</p>;
    },
  },
  {
    accessorKey: "paid",
    header: "Paid Amount",
    cell: ({ row }) => {
      const paid = row.original.paid;
      return <p>{paid.toLocaleString("en-BD")}</p>;
    },
  },
  {
    accessorKey: "due",
    header: "Due",
    cell: ({ row }) => {
      const due = row.original.due;
      return <p>{due.toLocaleString("en-BD")}</p>;
    },
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
  },

  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const customer = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit Customer-{customer.id}</DropdownMenuItem>
            <DropdownMenuItem>View Customer</DropdownMenuItem>
            <DropdownMenuItem>Delete Customer</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
