/** @format */

import React from "react";
import { GET_PRODUCTS_WITH_CATEGORY_AND_STOCK } from "../../query/sale.query";
import client from "@/lib/apolloClient";

import CategoryList from "../components/categories";
import Cart from "../components/cart";
import CartProvider from "../../providers/cart.prodiver";

const NewSale = async () => {
  // Fetch products from server
  const { data } = await client.query({
    query: GET_PRODUCTS_WITH_CATEGORY_AND_STOCK,
    fetchPolicy: "no-cache",
  });

  return (
    <CartProvider>
      <div className="flex w-full justify-center">
        <div className="flex w-full space-x-4 ">
          <CategoryList data={data} />

          <Cart />
        </div>
      </div>
    </CartProvider>
  );
};

export default NewSale;
