---
title: Features Layout
spacing:
blocks:
  _bookshop_name: "wrappers/grid"
  layout: features
  minItemWidth: 350
  maxItemWidth: 350
  items:
    - contentBlocks:
        - _bookshop_name: "wrappers/card"
          paddingHorizontal: md
          paddingVertical: md
          rounded: true
          border: true
          contentBlocks:
            - _bookshop_name: "typography/heading"
              text: "Feature One"
              level: h3
            - _bookshop_name: "typography/simple-text"
              text: "The features layout sizes items within the min/max width provided."
    - contentBlocks:
        - _bookshop_name: "wrappers/card"
          paddingHorizontal: md
          paddingVertical: md
          rounded: true
          border: true
          contentBlocks:
            - _bookshop_name: "typography/heading"
              text: "Feature Two"
              level: h3
            - _bookshop_name: "typography/simple-text"
              text: "Items are centered if there is extra whitespace."
    - contentBlocks:
        - _bookshop_name: "wrappers/card"
          paddingHorizontal: md
          paddingVertical: md
          rounded: true
          border: true
          contentBlocks:
            - _bookshop_name: "typography/heading"
              text: "Feature Three"
              level: h3
            - _bookshop_name: "typography/simple-text"
              text: "You can ensure all items are always equal in a features layout by giving it the same value for min and max width."
    - contentBlocks:
        - _bookshop_name: "wrappers/card"
          paddingHorizontal: md
          paddingVertical: md
          rounded: true
          border: true
          contentBlocks:
            - _bookshop_name: "typography/heading"
              text: "Feature Four"
              level: h3
            - _bookshop_name: "typography/simple-text"
              text: "You can make it more flexible by using different min/max widths, but keep in mind the last row might be larger if there's an uneven number of items."
---
