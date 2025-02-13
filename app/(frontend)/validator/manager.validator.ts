/** @format */

import { z } from "zod";

export const loginValidator = z.object({
  phone: z.string().min(11, { message: "Phone number must be 11 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
