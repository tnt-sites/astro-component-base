/**
 * Extracts arbitrary props from Astro.props while filtering out schema-defined props
 * to avoid duplicates when spreading props to HTML elements.
 *
 * @param astroProps - The Astro.props object
 * @param schema - The Zod schema used to validate the component props
 * @returns An object containing only the props not defined in the schema
 */
import type { z } from "zod/v4";

export function getRestProps(
  astroProps: Record<string, any>,
  schema: z.ZodSchema
): Record<string, any> {
  // Get the schema keys more safely
  const schemaKeys = new Set<string>();

  // Try to extract keys from the schema shape
  if (schema && typeof schema === "object" && "shape" in schema) {
    const shape = (schema as any).shape;

    if (shape && typeof shape === "object") {
      Object.keys(shape).forEach((key) => schemaKeys.add(key));
    }
  }

  return Object.fromEntries(
    Object.entries(astroProps).filter(([key]) => !schemaKeys.has(key) && key !== "_bookshop_name")
  );
}
