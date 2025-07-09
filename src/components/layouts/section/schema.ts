import { z } from "zod/v4";

// Nested Schemas
const marginSchema = z.object({
  top: z
    .enum(["none", "xs", "sm", "md", "lg", "xl", "2xl"])
    .meta({ description: "Top margin of the section." })
    .optional(),
  bottom: z
    .enum(["none", "xs", "sm", "md", "lg", "xl", "2xl"])
    .meta({ description: "Bottom margin of the section." })
    .optional(),
});

const paddingSchema = z.object({
  vertical: z
    .enum(["none", "xs", "sm", "md", "lg", "xl", "2xl"])
    .meta({ description: "Vertical padding of the section." })
    .optional(),
  horizontal: z
    .enum(["none", "xs", "sm", "md", "lg", "xl", "2xl"])
    .meta({ description: "Horizontal padding of the section." })
    .optional(),
});

const alignmentSchema = z.object({
  text: z
    .enum(["start", "center", "end"])
    .meta({ description: "Text alignment within the section." })
    .optional(),
  horizontal: z
    .enum(["start", "center", "end"])
    .meta({ description: "Horizontal alignment of content." })
    .optional()
    .default("center"),
  vertical: z
    .enum(["top", "center", "bottom", "between"])
    .meta({ description: "Vertical alignment of content." })
    .optional()
    .default("top"),
});

const shapeSchema = z.object({
  type: z
    .enum(["none", "diagonal", "diagonal-top", "diagonal-bottom", "wedge"])
    .meta({ description: "Type of decorative shape." })
    .optional(),
  size: z
    .enum(["normal", "large"])
    .meta({ description: "Size of the decorative shape." })
    .optional(),
  reverse: z
    .boolean()
    .meta({ description: "Reverse the direction of the shape." })
    .optional()
    .default(false),
});

const backgroundSchema = z.object({
  color: z
    .enum(["subtle", "highlight", "accent", "base"])
    .meta({ description: "Background color of the section." })
    .optional(),
  scheme: z
    .enum(["light", "dark"])
    .meta({ description: "Color scheme for the background." })
    .optional(),
  shadow: z
    .enum(["none", "xs", "s", "m", "l", "xl", "2xl"])
    .meta({ description: "Shadow effect for the background." })
    .optional(),
  imageSrc: z.string().meta({ description: "Source URL for the background image." }).optional(),
  imageAlt: z.string().meta({ description: "Alt text for the background image." }).optional(),
  imageOpacity: z
    .number()
    .min(0)
    .max(1)
    .meta({ description: "Opacity of the background image." })
    .optional(),
  imageRounded: z
    .enum(["none", "xs", "s", "m", "l", "xl", "2xl", "3xl"])
    .meta({ description: "Rounded corners for the background image." })
    .optional(),
  imageHorizontalPosition: z
    .enum(["center"]) // Consider expanding this enum
    .meta({ description: "Horizontal position of the background image." })
    .optional()
    .default("center"),
  imageVerticalPosition: z
    .enum(["center"]) // Consider expanding this enum
    .meta({ description: "Vertical position of the background image." })
    .optional()
    .default("center"),
  imageAboveBackground: z
    .boolean()
    .meta({ description: "Place image above background color." })
    .optional()
    .default(false),
  imageRepeat: z
    .boolean()
    .meta({ description: "Repeat the background image." })
    .optional()
    .default(false),
  imageFixed: z
    .boolean()
    .meta({ description: "Fix the background image on scroll." })
    .optional()
    .default(false),
  imageFit: z
    .enum(["contain", "cover", "fill"])
    .meta({ description: "Fit of the background image." })
    .optional()
    .default("cover"),
  transformScale: z
    .number()
    .meta({ description: "Scale transformation for the background." })
    .optional(),
  transformTranslateX: z
    .number()
    .meta({ description: "Horizontal translation for the background." })
    .optional(),
  transformTranslateY: z
    .number()
    .meta({ description: "Vertical translation for the background." })
    .optional(),
  transformBlur: z.number().meta({ description: "Blur effect for the background." }).optional(),
  transformOpacity: z
    .number()
    .min(0)
    .max(1)
    .meta({ description: "Opacity transformation for the background." })
    .optional(),
});

const borderSchema = z.object({
  width: z.enum(["thin", "thick"]).meta({ description: "Width of the border." }).optional(),
  type: z
    .enum([
      "none",
      "solid",
      "dashed",
      "dotted",
      "rounded",
      "rounded-large",
      "rounded-top",
      "rounded-top-large",
      "rounded-bottom",
      "rounded-bottom-large",
    ])
    .meta({ description: "Type of the border." })
    .optional(),
  color: z
    .enum(["none", "subtle", "strong"])
    .meta({ description: "Color of the border." })
    .optional(),
});

export const sectionSchema = z
  .object({
    label: z
      .string()
      .meta({
        description: "Optional label for the section, for identification in CMS.",
      })
      .optional(),
    contentBlocks: z
      .array(z.any())
      .meta({ description: "Array of content blocks within the section." })
      .optional(),
    link: z
      .string()
      .meta({ description: "Optional URL if the entire section should be a link." })
      .optional(),

    maxContentWidth: z
      .enum(["none", "xs", "sm", "md", "lg", "xl", "2xl"])
      .meta({ description: "Maximum width of the content area." })
      .optional(),

    margin: marginSchema.optional(),
    padding: paddingSchema.optional(),
    alignment: alignmentSchema.optional(),
    shape: shapeSchema.optional(),
    background: backgroundSchema.optional(),
    border: borderSchema.optional(),

    id: z.string().meta({ description: "The ID attribute for the section element." }).optional(),
    className: z
      .string()
      .meta({
        description: "Additional CSS classes to add to the section element.",
      })
      .optional(),
    contentClassName: z
      .string()
      .meta({
        description: "Additional CSS classes to add to the content area of the section.",
      })
      .optional(),
    customStyle: z
      .string()
      .meta({ description: "Inline CSS styles to apply to the section element." })
      .optional(),
    ariaLabel: z.string().meta({ description: "Accessibility label for the section." }).optional(),
  })
  .transform((data) => {
    return {
      ...data,
      alignment: data.alignment ?? alignmentSchema.parse({}),
      shape: data.shape ?? shapeSchema.parse({}),
      background: data.background ?? backgroundSchema.parse({}),
    };
  });

export type SectionProps = z.infer<typeof sectionSchema>;
