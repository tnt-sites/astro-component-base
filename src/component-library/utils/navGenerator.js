import { getCollection } from "astro:content";

export async function generateNavData(navData) {
  const allComponents = await getCollection("docs-components");

  const componentsByCategory = {};

  allComponents.forEach((component) => {
    const slug = component.id.replace(/^components\//, "").replace(/\/index$/, "");
    const parts = slug.split("/").filter(Boolean);

    if (slug.includes("/examples/") || (!component.data.title && !component.data.name)) {
      return;
    }

    if (parts.length >= 1) {
      const path = `/component-library/components/${slug}/`;
      const componentName = parts[parts.length - 1];

      // Handle new nested structure: building-blocks/core-elements/button, page-sections/heroes/hero-split
      // Navigation is special: files are at navigation/bar but displayed as flat under "Navigation"
      if (parts.length >= 2) {
        const topCategory = parts[0]; // building-blocks, page-sections, navigation
        const subCategory = parts[1]; // core-elements, forms, wrappers, blocks, bar, footer, etc.

        if (!componentsByCategory[topCategory]) {
          componentsByCategory[topCategory] = {};
        }

        // Navigation is displayed as flat, so use "default" for all navigation components
        if (topCategory === "navigation") {
          if (!componentsByCategory[topCategory]["default"]) {
            componentsByCategory[topCategory]["default"] = [];
          }
          componentsByCategory[topCategory]["default"].push({
            name: component.data.title || componentName.replace(/-/g, " "),
            path,
            order: Number(component.data.order) || 999,
          });
        } else {
          // For building-blocks and page-sections, use the subcategory
          if (!componentsByCategory[topCategory][subCategory]) {
            componentsByCategory[topCategory][subCategory] = [];
          }
          componentsByCategory[topCategory][subCategory].push({
            name: component.data.title || componentName.replace(/-/g, " "),
            path,
            order: Number(component.data.order) || 999,
          });
        }
      } else if (parts.length === 1) {
        // Handle flat structure (legacy or single-level categories)
        const category = parts[0];

        if (!componentsByCategory[category]) {
          componentsByCategory[category] = {};
        }
        if (!componentsByCategory[category]["default"]) {
          componentsByCategory[category]["default"] = [];
        }
        componentsByCategory[category]["default"].push({
          name: component.data.title || componentName.replace(/-/g, " "),
          path,
          order: Number(component.data.order) || 999,
        });
      }
    }
  });

  const convertToNavData = (sections) => {
    return sections
      .map((section) => {
        if (section.group && section.items && Array.isArray(section.items)) {
          return {
            name: section.group,
            path: "#",
            children: section.items.map((item) => {
              // Handle nested items (like "Core Elements" with component items)
              // Check if it's a group (has group property) or has items array
              if (item.group || (item.items && Array.isArray(item.items))) {
                return {
                  name: item.group || item.name || "",
                  path: "#",
                  children: (item.items || []).map((subItem) => ({
                    name: subItem.name,
                    path: subItem.path,
                    children: [],
                  })),
                };
              }
              // Handle flat items (like navigation items without groups)
              return {
                name: item.name || "",
                path: item.path || "#",
                children: [],
              };
            }),
          };
        }

        if (section.path) {
          return {
            name: section.name || "",
            path: section.path,
            children: section.children || [],
          };
        }

        return null;
      })
      .filter(Boolean);
  };

  const populatedNavData = navData.map((section) => {
    if (section.group) {
      const category = section.group.toLowerCase().replace(/\s+/g, "-");
      const categoryData = componentsByCategory[category] || {};

      // Handle nested structure (Building Blocks, Page Sections)
      if (section.children && Array.isArray(section.children) && section.children.length > 0) {
        const nestedItems = section.children.map((child) => {
          if (child.group) {
            const childCategory = child.group.toLowerCase().replace(/\s+/g, "-");
            const childData = categoryData[childCategory] || [];
            const sortedItems = childData.sort((a, b) => {
              if (a.order !== b.order) {
                return a.order - b.order;
              }
              return a.name.localeCompare(b.name);
            });

            return {
              ...child,
              items: sortedItems,
            };
          }
          return child;
        });

        return {
          ...section,
          items: nestedItems,
        };
      }

      // Handle flat structure (Navigation)
      const items = categoryData.default || [];
      const sortedItems = items.sort((a, b) => {
        if (a.order !== b.order) {
          return a.order - b.order;
        }
        return a.name.localeCompare(b.name);
      });

      return {
        ...section,
        items: sortedItems,
      };
    }

    return section;
  });

  return convertToNavData(populatedNavData);
}
