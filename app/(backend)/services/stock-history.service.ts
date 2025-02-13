/** @format */

import { type UpdateStockSchema } from "./stock.service";
import { db } from "@/lib/db";
export const createStockHistory = async ({
  productId,
  godownId,
  quantity,
  actionType,
  source,
}: UpdateStockSchema) => {
  const newHistory = await db.stockHistory.create({
    data: {
      productId,
      godownId,
      quantity,
      actionType,
      source,
    },
  });
  return newHistory;
};
