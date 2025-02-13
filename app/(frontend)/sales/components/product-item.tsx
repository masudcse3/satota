/** @format */
"use client";
import { ADD_ITEM } from "../../reducers/cart/cart.actionTypes";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

import { TProduct, TStocks } from "@/types";
import { useCart } from "../../contexts/cart.context";

const ProductItem = ({
  product,
  stock,
}: {
  product: TProduct;
  stock: TStocks;
}) => {
  const [quantity, setQuantity] = useState(1);
  const [godownId, setGodownId] = useState(1);
  const { dispatch } = useCart();
  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  const manualQuantity = (q: number) => {
    setQuantity(q);
  };
  // handle ad to cart
  const handleAddToCart = () => {
    dispatch({
      type: ADD_ITEM,
      payload: {
        item: {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity,
          weight: product.weight,
          unit: product.unit,
          godownId,
          totalPrice: product.price * quantity,
        },
      },
    });
    setQuantity(1);
  };

  return (
    <div className="border border-1 rounded p-4 flex flex-col items-center space-y-2">
      <h4>
        {product.name} ({product.weight}
        {product.unit})
      </h4>
      <p>{product.price}</p>
      <span>Available: {stock.totalQuantity}</span>

      <Select
        defaultValue="1"
        onValueChange={(value: string) => setGodownId(parseInt(value))}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Godown" />
        </SelectTrigger>
        <SelectContent>
          {stock.godowns.map((godown) => (
            <SelectItem
              key={`${crypto.randomUUID()}-${product.id}`}
              value={godown.id.toString(10)}
            >
              {godown.name}-{godown.quantity}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="cart flex space-x-2 my-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 shrink-0 rounded-full"
          onClick={decrementQuantity}
        >
          <Minus />
        </Button>
        <Input
          className="w-[100px]"
          type="number"
          value={quantity}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            manualQuantity(parseInt(e.target.value))
          }
        />
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 shrink-0 rounded-full"
          onClick={incrementQuantity}
        >
          <Plus />
        </Button>
      </div>
      <Button
        variant="outline"
        onClick={handleAddToCart}
        className="bg-bgactive text-white"
      >
        <ShoppingCart />
        Add to cart
      </Button>
    </div>
  );
};

export default ProductItem;
