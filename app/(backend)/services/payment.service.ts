/** @format */

import { db } from "@/lib/db";
import { Payment, PaymentMethod } from "@prisma/client";
export const createPayment = async (
  _: unknown,
  {
    customerId,
    paymentMethod,
    amount,
  }: {
    customerId: number;
    paymentMethod: PaymentMethod;
    amount: number;
  }
): Promise<Payment> => {
  try {
    const payment = await db.payment.create({
      data: {
        customerId,
        paymentMethod,
        amount,
      },
      include: {
        customer: true,
      },
    });
    if (!payment) {
      throw new Error("Failed to create payment");
    }
    return payment;
  } catch (error) {
    throw error;
  }
};
