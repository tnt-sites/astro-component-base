// Combined schema for NavItem and NavList as they are mutually recursive

import { z } from "zod/v4";

const navItemBase = z.object({
  href: z.string().optional(),
  label: z.string().optional(),
  iconName: z.string().optional(),
  className: z.string().optional(),
  customStyle: z.string().optional(),
  id: z.string().optional(),
  defaultOpen: z.boolean().optional(),
  layout: z.enum(["bar", "sidebar"]).optional(),
});

const navListBase = z.object({
  className: z.string().optional(),
  customStyle: z.string().optional(),
  id: z.string().optional(),
  layout: z.enum(["bar", "sidebar"]).optional(),
});

type NavItem = z.infer<typeof navItemBase> & {
  navList?: NavList;
};
type NavList = z.infer<typeof navListBase> & {
  items?: NavItem[];
};

export const navItemSchema: z.ZodType<NavItem> = navItemBase.extend({
  navList: z.lazy(() => navListSchema).optional(),
});

export const navListSchema: z.ZodType<NavList> = navListBase.extend({
  items: z.array(z.lazy(() => navItemSchema)).optional(),
});

export type NavItemProps = NavItem;
export type NavListProps = NavList;
