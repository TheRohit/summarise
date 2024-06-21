import { z } from "zod";

export const LinkValidator = z.object({
  url: z.string().min(2, {
    message: "link must be at least 2 characters.",
  }),
});

export type LinkRequest = z.infer<typeof LinkValidator>;
