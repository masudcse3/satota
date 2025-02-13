/** @format */

import { db } from "@/lib/db";
import { Prisma, Stock } from "@prisma/client";
import { createStockHistory } from "./stock-history.service";
export type UpdateStockSchema = {
  productId: number;
  godownId: number;
  quantity: number;
  actionType: "STOCK_IN" | "STOCK_OUT";
  source: "Mill" | "Supplier" | "Sale" | "LC";
};

export const updateStock = async (
  _: unknown,
  { productId, godownId, quantity, actionType, source }: UpdateStockSchema
): Promise<Stock> => {
  try {
    const stock = await db.stock.findUnique({
      where: {
        productId_godownId: { productId, godownId },
      },
    });
    if (!stock) {
      throw new Error("Stock not found");
    }
    const newQuantity =
      actionType === "STOCK_IN"
        ? stock.quantity + quantity
        : stock.quantity - quantity;
    if (newQuantity < 0) {
      throw new Error(
        "Insufficient stock for this product in the selected godown."
      );
    }
    const newStock = await db.stock.update({
      where: { productId_godownId: { productId, godownId } },
      data: { quantity: newQuantity },
      include: { product: true },
    });
    // create a new stock history
    await createStockHistory({
      productId,
      godownId,
      actionType,
      source,
      quantity,
    });
    return newStock;
  } catch (error) {
    throw error;
  }
};

export const getStockDetails = async (
  _: unknown,
  { categoryName = "", productName = "" }
) => {
  const whereCondition: Prisma.StockWhereInput = {};

  if (categoryName || productName) {
    whereCondition.product = {}; // Ensure product filter exists
  }

  if (categoryName) {
    whereCondition.product!.category = { name: categoryName };
  }

  if (productName) {
    whereCondition.product!.name = productName;
  }

  const stocks = await db.stock.findMany({
    where: Object.keys(whereCondition).length ? whereCondition : undefined, // Apply filters only if needed
    include: {
      product: { include: { category: true } },
      godown: true,
    },
  });

  // Transform data into the required structure
  const stockSummary = stocks.reduce(
    (acc, stock) => {
      const { product, godown, quantity } = stock;

      let productEntry = acc.find((entry) => entry.product === product.name);

      if (!productEntry) {
        productEntry = {
          product: product.name,
          category: product.category.name,
          totalQuantity: 0,
          godowns: [],
        };
        acc.push(productEntry);
      }

      productEntry.totalQuantity += quantity;

      productEntry.godowns.push({
        id: godown.id,
        name: godown.name,
        quantity,
      });

      return acc;
    },
    [] as {
      product: string;
      category: string;
      totalQuantity: number;
      godowns: { id: number; name: string; quantity: number }[];
    }[]
  );

  return stockSummary;
};
