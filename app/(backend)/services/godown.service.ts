/** @format */

import { db } from "@/lib/db";

export const createGodown = async (
  _: unknown,
  {
    name,
    address = "",
  }: {
    name: string;
    address?: string;
  }
) => {
  const existGodown = await db.godown.findFirst({
    where: {
      AND: [{ name, address }],
    },
  });
  if (existGodown) {
    throw new Error("Godown already exists");
  }
  const godown = await db.godown.create({
    data: {
      name,
      address,
    },
  });
  return godown;
};

export const updateGodown = async (
  _: unknown,
  {
    id,
    name,
    address,
  }: {
    id: number;
    name?: string;
    address?: string;
  }
) => {
  try {
    const godown = await db.godown.findUnique({ where: { id } });
    const updatedGodown = await db.godown.update({
      where: { id: id },
      data: {
        name: name || godown?.name,
        address: address || godown?.address,
      },
    });
    return updatedGodown;
  } catch (error) {
    throw error;
  }
};
