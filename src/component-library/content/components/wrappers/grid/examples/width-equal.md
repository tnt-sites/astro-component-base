---
title: Equal width items
spacing:
blocks:
  _bookshop_name: "wrappers/grid"
  minItemWidth: 100
  maxItemWidth: 300
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
              text: "Equal Width"
              level: h3
            - _bookshop_name: "primitives/simple-text"
              text: "All items have the same width regardless of content length. This creates a uniform, grid-like appearance."
    - contentBlocks:
        - _bookshop_name: "wrappers/card"
          backgroundColor: "accent"
          paddingHorizontal: md
          paddingVertical: md
          contentBlocks:
            - _bookshop_name: "primitives/heading"
              text: "Consistent Layout"
              level: h3
            - _bookshop_name: "primitives/simple-text"
              text: "Perfect for displaying cards, features, or any content that should have consistent sizing."
    - contentBlocks:
        - _bookshop_name: "wrappers/card"
          backgroundColor: "highlight"
          paddingHorizontal: md
          paddingVertical: md
          contentBlocks:
            - _bookshop_name: "primitives/heading"
              text: "Responsive Design"
              level: h3
            - _bookshop_name: "primitives/simple-text"
              text: "Items automatically wrap and adjust based on available space while maintaining equal widths."
---
