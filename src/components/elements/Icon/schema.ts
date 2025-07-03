import { z } from "zod/v4";

export const iconSchema = z
  .object({
    name: z.string().meta({
      description: "Path to the icon relative to the icons directory (without extension)",
    }),
    size: z
      .enum(["none", "xs", "sm", "md", "lg", "xl"])
      .meta({ description: "Size class to apply to the icon" })
      .default("md"),
    className: z
      .string()
      .meta({ description: "Additional class names to apply to the SVG" })
      .default(""),
    flipRtl: z
      .boolean()
      .meta({ description: "Specify if this icon should flip in RTL contexts" })
      .default(false),
    label: z.string().meta({ description: "Accessibility label for the icon" }).optional(),
    customStyle: z
      .string()
      .meta({ description: "Inline CSS styles to apply to the SVG" })
      .default(""),
    buttonIcon: z
      .boolean()
      .meta({ description: "Switches styling on for within a button" })
      .default(false),
  })
  .meta({
    description:
      "A visual representation of an object, action, or idea. Icons are used to represent various concepts, actions, and entities in a visual and intuitive way.",
  });

export type IconProps = z.infer<typeof iconSchema>;
