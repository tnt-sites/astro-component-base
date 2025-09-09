---
title: Horizontal Alignment - End
spacing:
blocks:
  _bookshop_name: "wrappers/grid"
  minItemWidth: 200
  maxItemWidth: 250
  horizontalAlignment: "end"
  equalWidth: true
  items:
    - contentBlocks:
        - _bookshop_name: "wrappers/card"
          backgroundColor: "surface"
          paddingHorizontal: md
          paddingVertical: md
          contentBlocks:
            - _bookshop_name: "primitives/heading"
              text: "Item 1"
              level: h3
            - _bookshop_name: "primitives/simple-text"
              text: "This is a grid item with sample content."
    - contentBlocks:
        - _bookshop_name: "wrappers/card"
          backgroundColor: "accent"
          paddingHorizontal: md
          paddingVertical: md
          contentBlocks:
            - _bookshop_name: "primitives/heading"
              text: "Item 2"
              level: h3
            - _bookshop_name: "primitives/simple-text"
              text: "This is a grid item with sample content."
    - contentBlocks:
        - _bookshop_name: "wrappers/card"
          backgroundColor: "highlight"
          paddingHorizontal: md
          paddingVertical: md
          contentBlocks:
            - _bookshop_name: "primitives/heading"
              text: "Item 3"
              level: h3
            - _bookshop_name: "primitives/simple-text"
              text: "This is a grid item with sample content."
---
