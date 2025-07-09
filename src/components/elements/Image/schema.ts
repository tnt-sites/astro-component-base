import { z } from "zod";

export const ImageSchema = z
  .object({
    src: z.string().describe("The source URL or path of the image"),
    alt: z.string().describe("Alternative text for accessibility"),
    width: z.number().optional().describe("Width of the image in pixels"),
    height: z.number().optional().describe("Height of the image in pixels"),
  })
  .catchall(z.any());

export type ImageProps = z.infer<typeof ImageSchema>;
