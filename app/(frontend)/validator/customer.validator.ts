/** @format */

import { z } from "zod";

export const customerValidator = z.object({
  name: z
    .string()
    .min(3, { message: "minimum character 3" })
    .max(15, { message: "maximum character 15" }),
  phone: z
    .string()
    .min(11, { message: "Phone number must be 11 characters" })
    .max(14, { message: "Phone number must be 14 characters" }),
  address: z.string(),
  type: z.enum(["Retail", "Wholesale"]),
});
