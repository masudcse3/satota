/** @format */

import { db } from "@/lib/db";
import { Product as ProductSchema } from "@prisma/client";

export type ProductInputSchema = {
  name: string;
  weight: number;
  unit: "Kg" | "Bag";
  price: number;
  categoryId: number;
};
export const createProduct = async (
  _: unknown,
  { name, weight, unit, price, categoryId }: ProductInputSchema
): Promise<ProductSchema> => {
  try {
    const existProduct = await db.product.findFirst({
      where: {
        name,
        categoryId,
      },
    });
    if (existProduct) {
      throw new Error("Product already exists");
    }
    const categoryExist = await db.category.findUnique({
      where: { id: categoryId },
    });
    if (!categoryExist) {
      throw new Error("Category not found");
    }
    // create new product
    const product = await db.product.create({
      data: {
        name,
        weight,
        unit,
        price,
        category: { connect: { id: categoryId } },
      },
      include: { category: true },
    });
    // create a stock for every godown
    const godowns = await db.godown.findMany();
    godowns.forEach(async (godown) => {
      await db.stock.create({
        data: {
          product: { connect: { id: product.id } },
          godown: { connect: { id: godown.id } },
          quantity: 0,
        },
      });
    });
    return product;
  } catch (error) {
    throw error;
  }
};
export const createBulkProducts = async (
  _: unknown,
  {
    products,
  }: {
    products: ProductInputSchema[];
  }
) => {
  try {
    products.forEach(
      async (product: ProductInputSchema): Promise<ProductSchema> => {
        return await createProduct(_, {
          name: product.name,
          weight: product.weight,
          unit: product.unit,
          price: product.price,
          categoryId: product.categoryId,
        });
      }
    );
    return products;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (
  _: unknown,
  {
    id,
    price,
  }: {
    id: number;
    price: number;
  }
): Promise<ProductSchema> => {
  try {
    const product = await db.product.findUnique({ where: { id } });
    if (!product) {
      throw new Error("Product not found");
    }
    return await db.product.update({
      where: { id },
      data: {
        price: price,
      },
    });
  } catch (error) {
    throw error;
  }
};
