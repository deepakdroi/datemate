import { z } from "zod";

export const memberEditSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name should be at least 3 character long." })
    .max(15, { message: "Name should be at most 15 character long." }),
  description: z.string().min(1, { message: "Description is required" }),
  city: z.string().min(1, { message: "City is required" }),
  country: z.string().min(1, { message: "Country is required" }),
});

export type MemberEditSchema = z.infer<typeof memberEditSchema>;
