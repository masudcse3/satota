/** @format */

import { z } from "zod";

export const saleValidator = z.object({
  paid: z.number().positive(),
  discount: z.number().min(0),
  paymentMethod: z
    .enum(["Cash", "Check", "BankTransfer", "MobileBank"])
    .default("Cash"),
});
