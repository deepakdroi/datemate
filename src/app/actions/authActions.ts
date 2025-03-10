"use server";

import { auth, signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { LoginSchema } from "@/lib/schemas/LoginSchema";
import { registerSchema, RegisterSchema } from "@/lib/schemas/RegisterSchema";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

export async function signInUser(
  data: LoginSchema
): Promise<ActionResult<string>> {
  try {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    console.log(result);
    return { status: "success", data: "Logged in" };
  } catch (error) {
    console.log(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { status: "error", error: "Invalid credentials" };
        default:
          return {
            status: "error",
            error: "An error occurred while logging in",
          };
      }
    } else {
      return { status: "error", error: "Something went wrong." };
    }
  }
}

export async function signOutUser() {
  await signOut({ redirectTo: "/" });
}

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

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email } });
}

export async function getUserById(id: string) {
  return await prisma.user.findUnique({ where: { id } });
}

export async function getAuthUserId() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("Unauthorized");

  return userId;
}
