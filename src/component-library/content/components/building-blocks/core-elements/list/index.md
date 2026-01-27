---
title: List
overview: "Displays an icon list with support for vertical or horizontal layouts, custom styling, alignment, and markdown formatting. For standard bullet or numbered lists, use [Rich Text](/component-library/components/building-blocks/core-elements/text) instead."
slots:
  - title: default
    description: The content inside the List.
    fallback_for: items
    child_component:
      name: ListItem
      props:
        - "icon"
        - "text/slot"
examples:
  - slugs:
      - direction-vertical
      - direction-horizontal
    title: Directions
  - slugs:
      - alignment-start-vertical
      - alignment-center-vertical
      - alignment-end-vertical
      - alignment-start-horizontal
      - alignment-center-horizontal
      - alignment-end-horizontal
    title: AlignX
  - slugs:
      - size-xs
      - size-sm
      - size-md
      - size-lg
      - size-xl
      - size-2xl
      - size-3xl
      - size-4xl
    title: Sizes
  - slugs:
      - icon-colors
---
