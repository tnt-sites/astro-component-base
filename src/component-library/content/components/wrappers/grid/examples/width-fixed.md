---
title: Fixed width items
spacing:
blocks:
  _bookshop_name: "wrappers/grid"
  minItemWidth: 270
  maxItemWidth: 270
  equalWidth: true
  verticalAlignment: "stretch"
  items:
    - contentBlocks:
        - _bookshop_name: "wrappers/card"
          backgroundColor: "surface"
          paddingHorizontal: md
          paddingVertical: md
          contentBlocks:
            - _bookshop_name: "primitives/heading"
              text: "Fixed Width"
              level: h3
            - _bookshop_name: "primitives/simple-text"
              text: "All items have exactly the same width regardless of content length. This creates a rigid, uniform grid."
    - contentBlocks:
        - _bookshop_name: "wrappers/card"
          backgroundColor: "accent"
          paddingHorizontal: md
          paddingVertical: md
          contentBlocks:
            - _bookshop_name: "primitives/heading"
              text: "Rigid Layout"
              level: h3
            - _bookshop_name: "primitives/simple-text"
              text: "Perfect for displaying cards or features that need to be exactly the same size."
    - contentBlocks:
        - _bookshop_name: "wrappers/card"
          backgroundColor: "highlight"
          paddingHorizontal: md
          paddingVertical: md
          contentBlocks:
            - _bookshop_name: "primitives/heading"
              text: "Predictable Sizing"
              level: h3
            - _bookshop_name: "primitives/simple-text"
              text: "Items maintain their exact width and wrap to new rows when needed."
---
