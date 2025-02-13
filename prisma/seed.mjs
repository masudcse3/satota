/** @format */

import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const generateCustomers = () => {
  return {
    name: faker.person.fullName(),
    phone: faker.phone.number({ style: "international" }),
    address: faker.address.street(),
    type: faker.helpers.arrayElement(["Retail", "Wholesale"]),
  };
};
const main = async () => {
  try {
    await prisma.customer.createMany({
      data: Array.from({ length: 5000 }, generateCustomers), // create 5000 customers
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
main();
