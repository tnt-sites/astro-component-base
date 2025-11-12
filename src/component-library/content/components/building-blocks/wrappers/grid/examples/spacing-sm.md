---
title: Small Spacing
spacing:
blocks:
  _component: "building-blocks/wrappers/grid"
  layout: center
  gap: sm
  minItemWidth: 200
  maxItemWidth: 300
  items:
    - contentBlocks:
        - _component: "building-blocks/wrappers/card"
          paddingHorizontal: md
          paddingVertical: md
          rounded: true
          border: true
          contentBlocks:
            - _component: "building-blocks/core-elements/heading"
              text: "Item 1"
              level: h3
            - _component: "building-blocks/core-elements/text"
              text: "Small spacing provides subtle separation."
    - contentBlocks:
        - _component: "building-blocks/wrappers/card"
          paddingHorizontal: md
          paddingVertical: md
          rounded: true
          border: true
          contentBlocks:
            - _component: "building-blocks/core-elements/heading"
              text: "Item 2"
              level: h3
            - _component: "building-blocks/core-elements/text"
              text: "Good for related content groups."
    - contentBlocks:
        - _component: "building-blocks/wrappers/card"
          paddingHorizontal: md
          paddingVertical: md
          rounded: true
          border: true
          contentBlocks:
            - _component: "building-blocks/core-elements/heading"
              text: "Item 3"
              level: h3
            - _component: "building-blocks/core-elements/text"
              text: "Maintains visual connection between items."
---
