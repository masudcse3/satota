/** @format */

import { db } from "@/lib/db";
import { PaymentMethod, Prisma } from "@prisma/client";
import { updateStock } from "./stock.service";
import { createPayment } from "./payment.service";
import { type FilterOptionsWithDate } from "@/types";
export type CartSchema = {
  orderId: number;
  productId: number;
  godownId: number;
  quantity: number;
  price: number;
};
export type OrderSchame = {
  cart: CartSchema[];
  customerId: number;
  managerId: number;
  paid: number;
  discount: number;
  paymentMethod: PaymentMethod;
};

// create a new Order with all the details
export const createOrder = async (
  _: unknown,
  {
    cart,
    customerId,
    managerId,
    paid,
    discount = 0,
    paymentMethod,
  }: OrderSchame
) => {
  try {
    // calculate the total price
    const total = cart.reduce(
      (acc, cur) => (acc += cur.price * cur.quantity),
      0
    );
    const due = total - discount - paid;

    // create the order
    const order = await db.order.create({
      data: {
        customerId,
        managerId,
        total,
        paid,
        discount,
        due,
        paymentMethod,
      },
    });
    // create cart records for all the cart items

    cart.forEach(async (c) => {
      await db.cart.create({
        data: {
          orderId: order.id,
          productId: c.productId,
          godownId: c.godownId,
          quantity: c.quantity,
          price: c.price,
          totalPrice: c.price * c.quantity,
        },
      });
    });

    // create the payment
    await createPayment(_, { customerId, paymentMethod, amount: paid });

    // add the due amount to the customer
    const customer = await db.customer.findFirst({ where: { id: customerId } });
    if (!customer) {
      throw new Error("Customer not found");
    }
    await db.customer.update({
      where: { id: customerId },
      data: { due: customer.due + due },
    });
    // update stock for each item in the cart

    cart.forEach(async (c) => {
      await updateStock(_, {
        productId: c.productId,
        godownId: c.godownId,
        quantity: c.quantity,
        actionType: "STOCK_OUT",
        source: "Sale",
      });
    });
    const updatedOrder = await db.order.findUnique({
      where: { id: order.id },
      include: {
        cart: true,
        customer: true,
        orderedBy: true,
      },
    });
    return updatedOrder;
  } catch (error) {
    throw error;
  }
};

// get all order details
// filter by createdAt, limit=20, page=1, offset=page*limit - limit, prev=0, next=1
export const getOrders = async (
  _: unknown,
  { filter }: { filter: FilterOptionsWithDate }
) => {
  try {
    const {
      from = "",
      to = "",
      customerId = null,
      page = 1,
      limit = 20,
    } = filter;
    const whereCondition: Prisma.OrderWhereInput = {};
    if (from || to) {
      whereCondition.createdAt = {};
      if (from) whereCondition.createdAt.gte = new Date(from);
      if (to) whereCondition.createdAt.lte = new Date(to);
    }
    if (customerId) {
      whereCondition.customerId = customerId;
    }
    // fetch all the orders that meet the condition
    const orders = await db.order.findMany({
      where: whereCondition,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        customer: {
          select: { name: true, address: true, phone: true, due: true },
        },
        orderedBy: { select: { name: true } },
        cart: {
          select: {
            product: {
              select: {
                name: true,
                weight: true,
                unit: true,
                category: { select: { name: true } },
              },
            },
            godown: { select: { name: true, address: true } },
            price: true,
            quantity: true,
            totalPrice: true,
          },
        },
      },
    });
    const totalOrders = await db.order.count({ where: whereCondition });
    const totalPages = Math.ceil(totalOrders / limit);
    return {
      data: orders,
      pagination: {
        total: totalOrders,
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
// get order details by customer id
