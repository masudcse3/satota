/** @format */

import { TProduct, TStocks } from "@/types";
import React from "react";
import ProductItem from "./product-item";

const ProductList = ({
  products,
  stocks,
}: {
  products: TProduct[];
  stocks: TStocks[];
}) => {
  return (
    <>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            stock={stocks.find((s) => s.product === product.name)!}
          />
        ))}
      </div>
    </>
  );
};

export default ProductList;
