/** @format */
"use client";
import React, { useState } from "react";
import { TProduct, TStocks } from "@/types";
import { Button } from "@/components/ui/button";
import ProductList from "./product-list";
type TCategory = {
  id: number;
  name: string;
  products: TProduct[];
};

const CategoryList = ({
  data,
}: {
  data: {
    getCategories: TCategory[];
    getStocks: TStocks[];
  };
}) => {
  const [categoryName, setCategoryName] = useState("Rice");
  const categories = data.getCategories.map((cat: TCategory) => ({
    id: cat.id,
    name: cat.name,
  }));
  const products: TProduct[] = data.getCategories.filter(
    (c) => c.name === categoryName
  )[0].products;
  const stocks = data.getStocks.filter((s) => s.category === categoryName);

  return (
    <div className="productList border border-1 rounded p-4 w-3/5">
      <div className="categoryList border border-1 rounded p-4 space-x-2">
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={categoryName === cat.name ? "outline" : "ghost"}
            onClick={() => setCategoryName(cat.name)}
          >
            {cat.name}
          </Button>
        ))}
      </div>
      <div className="products">
        {products.length > 0 ? (
          <ProductList products={products} stocks={stocks} />
        ) : (
          <h2 className="text-center pt-4">
            No Products found for {categoryName}
          </h2>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
