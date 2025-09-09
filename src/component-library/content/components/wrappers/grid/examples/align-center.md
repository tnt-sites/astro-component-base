---
title: Center Alignment
spacing:
blocks:
  _bookshop_name: "wrappers/grid"
  minItemWidth: 200
  maxItemWidth: 250
  verticalAlignment: "center"
  equalWidth: true
  items:
    - contentBlocks:
        - _bookshop_name: "wrappers/card"
          backgroundColor: "surface"
          paddingHorizontal: md
          paddingVertical: md
          contentBlocks:
            - _bookshop_name: "primitives/heading"
              text: "Short Item"
              level: h3
            - _bookshop_name: "primitives/simple-text"
              text: "This is a short grid item."
    - contentBlocks:
        - _bookshop_name: "wrappers/card"
          backgroundColor: "accent"
          paddingHorizontal: md
          paddingVertical: md
          contentBlocks:
            - _bookshop_name: "primitives/heading"
              text: "Taller Item"
              level: h3
            - _bookshop_name: "primitives/simple-text"
              text: "This grid item has more content and will be taller than the others. It demonstrates how items align to the center when using center alignment."
    - contentBlocks:
        - _bookshop_name: "wrappers/card"
          backgroundColor: "highlight"
          paddingHorizontal: md
          paddingVertical: md
          contentBlocks:
            - _bookshop_name: "primitives/heading"
              text: "Medium Item"
              level: h3
            - _bookshop_name: "primitives/simple-text"
              text: "This item has medium height content."
---
