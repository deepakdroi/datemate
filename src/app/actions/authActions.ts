"use server";

import { prisma } from "@/lib/prisma";
import { registerSchema, RegisterSchema } from "@/lib/schemas/RegisterSchema";
import bcrypt from "bcryptjs";

export async function registerUser(data: RegisterSchema) {
	const validated = registerSchema.safeParse(data);

	if (!validated.success) {
		return { error: validated.error.errors };
	}

	const { name, age, gender, email, password } = validated.data;

	const hashedPassword = await bcrypt.hash(password, 10);
	console.log(data);
	const userExists = await prisma.user.findUnique({
		where: { email },
	});

	if (userExists) return "User already exists! Please try loging in.";

	return prisma.user.create({
		data: {
			name,
			age,
			gender,
			email,
			hashedPassword: hashedPassword,
		},
	});
}
