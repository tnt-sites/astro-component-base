import { z } from "zod/v4";

export const navSchema = z.object({
  align: z.enum(["start", "end", "center"]).optional(),
  mobileToggle: z.boolean().optional(),
  className: z.string().optional(),
  customStyle: z.string().optional(),
  id: z.string().optional(),
  layout: z.enum(["bar", "sidebar"]).optional().default("bar"),
  ariaLabel: z.string().optional(),
});

export type NavProps = z.infer<typeof navSchema>;
