/** @format */

import { db } from "@/lib/db";
import { type FilterOptions } from "@/types";
import { Prisma } from "@prisma/client";
export type CustomerSchema = {
  name: string;
  phone: string;
  address: string;
  type: "Retail" | "Wholesale";
};
export const createCustomer = async (
  _: unknown,
  { name, phone, address, type }: CustomerSchema
) => {
  // check if the customer is already exists
  const existCustomer = await db.customer.findUnique({
    where: { phone: phone },
  });
  if (existCustomer) {
    throw new Error("Customer already exists");
  }
  // create a new customer
  const customer = await db.customer.create({
    data: {
      name,
      phone,
      address,
      type,
    },
  });
  return customer;
};
export const updateCustomer = async (
  _: unknown,
  { id, data }: { id: number; data: Partial<CustomerSchema> }
) => {
  const customer = await db.customer.update({
    where: { id },
    data: { ...data },
  });
  return customer;
};

export const getCustomers = async (
  _: unknown,
  { filter }: { filter: FilterOptions }
) => {
  try {
    const { page = 1, limit = 20, q = "" } = filter;
    const whereCondition: Prisma.CustomerWhereInput = {};
    if (q) {
      whereCondition.OR = [
        {
          name: { contains: q, mode: "insensitive" },
        },
        {
          address: { contains: q, mode: "insensitive" },
        },
      ];
    }

    const customers = await db.customer.findMany({
      where: whereCondition,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });
    const totalCustomers = await db.customer.count({ where: whereCondition });
    const totalPages = Math.ceil(totalCustomers / limit);
    return {
      data: customers,
      pagination: {
        total: totalCustomers,
        page,
        limit,
        totalPages,
        prev: page > 1 ? page - 1 : false,
        next: page < totalPages ? page + 1 : false,
      },
    };
  } catch (error) {
    throw error;
  }
};
