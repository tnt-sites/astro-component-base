import { formatComponentWithSlots } from "./componentFormatter";
import { getComponentMetadataMap, getNestedBlockProperties } from "./componentMetadata";
import { getComponentDisplayName } from "./componentUtils";

function removeStyleField(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map((item) => removeStyleField(item));
  } else if (obj !== null && typeof obj === "object") {
    const result: any = {};

    for (const [key, value] of Object.entries(obj)) {
      if (key !== "style") {
        result[key] = removeStyleField(value);
      }
    }
    return result;
  }
  return obj;
}

/**
 * Gets the full component path for a child component
 * E.g., "typography/list" + "ListItem" -> "typography/list/list-item"
 */
function getChildComponentPath(parentPath: string, childName: string): string {
  // Convert PascalCase to kebab-case
  const kebabName = childName.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

  return `${parentPath}/${kebabName}`;
}

export async function formatBlocksAstro(blocks: any): Promise<string> {
  const metadataMap = await getComponentMetadataMap();
  const nestedBlockProperties = await getNestedBlockProperties();

  if (!blocks) return "";

  try {
    const blocksWithoutStyle = removeStyleField(blocks);
    const blocksArray = Array.isArray(blocksWithoutStyle)
      ? blocksWithoutStyle
      : [blocksWithoutStyle];

    // Get unique components and generate imports
    const uniqueComponents = new Set<string>();
    const addComponentToSet = (block: any) => {
      if (block._component) {
        uniqueComponents.add(block._component);
      }

      // Recursively check for nested components in properties that can contain blocks
      for (const prop of nestedBlockProperties) {
        if (block[prop]) {
          const nestedBlocks = Array.isArray(block[prop]) ? block[prop] : [block[prop]];

          nestedBlocks.forEach(addComponentToSet);
        }
      }

      if (block.formBlocks) {
        uniqueComponents.add("building-blocks/forms/form");
      }

      if (block._component) {
        const metadata = metadataMap.get(block._component);

        if (metadata?.childComponent && metadata?.fallbackFor) {
          const fallbackProp = metadata.fallbackFor;

          // Check if the fallback property exists and might need child components
          if (block[fallbackProp]) {
            const childComponentPath = getChildComponentPath(
              block._component,
              metadata.childComponent.name
            );

            if (childComponentPath) {
              uniqueComponents.add(childComponentPath);
            }

            // If the property contains items with nested content, discover those components too
            const items = Array.isArray(block[fallbackProp])
              ? block[fallbackProp]
              : [block[fallbackProp]];

            items.forEach((item: any) => {
              if (item && typeof item === "object") {
                // Check all block properties in items
                for (const prop of nestedBlockProperties) {
                  if (item[prop]) {
                    const nestedBlocks = Array.isArray(item[prop]) ? item[prop] : [item[prop]];

                    nestedBlocks.forEach(addComponentToSet);
                  }
                }
              }
            });
          }
        }
      }
    };

    blocksArray.forEach(addComponentToSet);

    // Generate import statements
    const imports = Array.from(uniqueComponents)
      .map((componentPath) => {
        // Generate import path - most components follow the pattern: category/component-name/component-name.astro
        // Exception: sub-components like list-item are just category/component-name.astro
        const parts = componentPath.split("/");
        const lastPart = parts[parts.length - 1];
        // Sub-components are components where the component name doesn't match the folder name
        // For paths with only 2 parts (e.g., "typography/text"), it's always a main component
        const isSubComponent = parts.length > 2 && lastPart !== parts[parts.length - 2];

        let importPath = componentPath;

        if (!isSubComponent) {
          // For main components, add the component name again: category/component-name/component-name
          const lastPart = parts[parts.length - 1];

          importPath = `${componentPath}/${lastPart}`;
        }

        return `import ${getComponentDisplayName(componentPath)} from "@components/${importpath}.astro";`;
      })
      .join("\n");

    const componentUsage = blocksArray
      .map((block) => {
        return formatComponentWithSlots(block, 0, metadataMap, nestedBlockProperties);
      })
      .join("\n\n");

    if (imports) {
      return `---\n${imports}\n---\n\n${componentUsage}`;
    } else {
      return componentUsage;
    }
  } catch (error) {
    console.error("Error formatting Astro code:", error);
    return "";
  }
}
