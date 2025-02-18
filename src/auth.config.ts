import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./lib/schemas/LoginSchema";
import { getUserByEmail } from "./app/actions/authActions";
import { compare } from "bcryptjs";

export default {
  providers: [
    Credentials({
      name: "Credentials",
      async authorize(credentials) {
        const validated = loginSchema.safeParse(credentials);

        if (validated.success) {
          const { email, password } = validated.data;
          console.log(email, password);

          const user = await getUserByEmail(email);
          console.log(user);

          if (!user || !(await compare(password, user.hashedPassword)))
            return null;

          return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
