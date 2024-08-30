import { z } from "zod";

export const signInSchema = z.object({
  identifier: z.string(), // identifier: email or username
  password: z.string(),
});
