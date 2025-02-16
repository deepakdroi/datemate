"use server";

import { prisma } from "@/lib/prisma";
import { registerSchema, RegisterSchema } from "@/lib/schemas/RegisterSchema";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";

export async function registerUser(
  data: RegisterSchema
): Promise<ActionResult<User>> {
  try {
    const validated = registerSchema.safeParse(data);

    if (!validated.success) {
      return { status: "error", error: validated.error.errors };
    }

    const { name, age, gender, email, password } = validated.data;

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(data);
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists)
      return {
        status: "error",
        error: "User already exists! Please try logging in.",
      };

    const user = await prisma.user.create({
      data: {
        name,
        age,
        gender,
        email,
        hashedPassword: hashedPassword,
      },
    });

    if (!user) {
      return { status: "error", error: "Failed to create user." };
    }
    return { status: "success", data: user };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "An error occurred while creating user" };
  }
}
