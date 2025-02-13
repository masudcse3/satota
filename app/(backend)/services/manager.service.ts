/** @format */

import { db } from "@/lib/db";
import { hashPassword } from "@/utils/password.utils";
import { Manager } from "@prisma/client";

export const createManger = async (
  _: unknown,
  { name, phone, address, password }: Manager
): Promise<Manager> => {
  try {
    const managerExists = await db.manager.findFirst({
      where: {
        phone,
      },
    });
    if (managerExists) {
      throw new Error("Manager with this phone already exists");
    }
    const manager = await db.manager.create({
      data: {
        name,
        phone,
        address,
        password: hashPassword(password),
      },
    });
    return manager;
  } catch (error) {
    throw error;
  }
};
