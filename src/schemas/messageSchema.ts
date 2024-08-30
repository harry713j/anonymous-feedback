import { z } from "zod";

export const acceptMessageSchema = z.object({
  content: z
    .string()
    .min(4, "Content must be at least 4 characters")
    .max(300, "Content must be no longer than 300 characters"),
});
