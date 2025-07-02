import { z } from "zod";

export const locationSchema = z.object({
  location: z.string(),
});