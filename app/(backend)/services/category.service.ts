/** @format */

import { db } from "@/lib/db";
import { Category as CategorySchema } from "@prisma/client";
export const createCategory = async (
  _: unknown,
  { name }: { name: string }
): Promise<CategorySchema> => {
  try {
    const existCategory = await db.category.findFirst({
      where: {
        name,
      },
    });
    if (existCategory) {
      throw new Error("Category already exists");
    }
    const category = await db.category.create({
      data: {
        name,
      },
    });
    return category;
  } catch (error) {
    throw error;
  }
};

export const createBulkCategories = async (
  _: unknown,
  {
    categories,
  }: {
    categories: CategorySchema[];
  }
) => {
  try {
    categories.forEach(async (category: CategorySchema) => {
      await createCategory(_, { name: category.name });
    });
    return categories;
  } catch (error) {
    throw error;
  }
};
