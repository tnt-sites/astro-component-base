---
title: Non equal width items
spacing:
blocks:
  _bookshop_name: "wrappers/grid"
  equalWidth: false
  items:
    - contentBlocks:
        - _bookshop_name: "wrappers/card"
          backgroundColor: "surface"
          paddingHorizontal: md
          paddingVertical: md
          contentBlocks:
            - _bookshop_name: "primitives/heading"
              text: "Short"
              level: h3
            - _bookshop_name: "primitives/simple-text"
              text: "Short content."
    - contentBlocks:
        - _bookshop_name: "wrappers/card"
          backgroundColor: "accent"
          paddingHorizontal: md
          paddingVertical: md
          contentBlocks:
            - _bookshop_name: "primitives/heading"
              text: "Medium Length Content"
              level: h3
            - _bookshop_name: "primitives/simple-text"
              text: "This item has medium length content that determines its natural width."
    - contentBlocks:
        - _bookshop_name: "wrappers/card"
          backgroundColor: "highlight"
          paddingHorizontal: md
          paddingVertical: md
          contentBlocks:
            - _bookshop_name: "primitives/heading"
              text: "Longer Content Title"
              level: h3
            - _bookshop_name: "primitives/simple-text"
              text: "This item has significantly more content and will be wider."
    - contentBlocks:
        - _bookshop_name: "wrappers/card"
          backgroundColor: "surface"
          paddingHorizontal: md
          paddingVertical: md
          contentBlocks:
            - _bookshop_name: "primitives/heading"
              text: "Tiny"
              level: h3
            - _bookshop_name: "primitives/simple-text"
              text: "Small."
---
