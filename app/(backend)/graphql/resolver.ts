/** @format */

import {
  createCustomer,
  getCustomers,
  updateCustomer,
} from "@/app/(backend)/services/customer.service";

export const resolvers = {
  Query: {
    getCustomers: getCustomers,
  },

  Mutation: {
    // Customer
    createCustomer: createCustomer,
    updateCustomer: updateCustomer,
  },
};
