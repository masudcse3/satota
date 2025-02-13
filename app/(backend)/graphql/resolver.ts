/** @format */

import // Category,
// Product,
// Cart,
// Payment,
// Customer,
// Manager,
// Order,
// Stock,
"@prisma/client";
import { db as prisma } from "@/lib/db";
import {
  createCustomer,
  getCustomers,
  updateCustomer,
} from "@/app/(backend)/services/customer.service";
import {
  createBulkProducts,
  createProduct,
  updateProduct,
} from "@/app/(backend)/services/product.service";
import {
  createGodown,
  updateGodown,
} from "@/app/(backend)/services/godown.service";
import {
  createBulkCategories,
  createCategory,
} from "@/app/(backend)/services/category.service";
import {
  getStockDetails,
  updateStock,
} from "@/app/(backend)/services/stock.service";
import { createOrder, getOrders } from "@/app/(backend)/services/order.service";
import { createManger } from "@/app/(backend)/services/manager.service";

// interface ProductSchema {
//   name: string;
//   weight: number;
//   unit: "Kg" | "Bag";
//   price: number;
//   description?: string;
//   categoryId: number;
// }

export const resolvers = {
  Query: {
    getCategories: async () =>
      await prisma.category.findMany({ include: { products: true } }),
    getCategoryById: async (_: unknown, { id }: { id: number }) =>
      await prisma.category.findUnique({ where: { id } }),

    getProducts: async () =>
      await prisma.product.findMany({
        include: { category: true, stock: true },
      }),
    getProductById: async (_: unknown, { id }: { id: number }) =>
      await prisma.product.findUnique({ where: { id } }),

    getManagers: async () => await prisma.manager.findMany(),
    getManagerById: async (_: unknown, { id }: { id: number }) =>
      await prisma.manager.findUnique({ where: { id } }),

    getCustomers: getCustomers,

    // Orders
    getOrders: getOrders,
    getOrderById: async (_: unknown, { id }: { id: number }) =>
      await prisma.order.findUnique({ where: { id } }),

    getCarts: async () => await prisma.cart.findMany(),
    getCartById: async (_: unknown, { id }: { id: number }) =>
      await prisma.cart.findUnique({ where: { id } }),

    getStocks: getStockDetails,
    getStockById: async (_: unknown, { id }: { id: number }) =>
      await prisma.stock.findUnique({ where: { id } }),

    getPayments: async () => await prisma.payment.findMany(),
    getPaymentById: async (_: unknown, { id }: { id: number }) =>
      await prisma.payment.findUnique({ where: { id } }),
  },

  Mutation: {
    // Customer
    createCustomer: createCustomer,
    updateCustomer: updateCustomer,

    // Manager
    createManager: createManger,
    // Godown
    createGodown: createGodown,
    updateGodown: updateGodown,
    // Category
    createCategory: createCategory,
    createBulkCategories: createBulkCategories,
    // products
    createProduct: createProduct,
    createBulkProducts: createBulkProducts,
    updateProduct: updateProduct,
    // Stocks
    updateStock: updateStock,
    // Orders
    createOrder: createOrder,
  },
};
