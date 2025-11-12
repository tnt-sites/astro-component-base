---
title: Uneven Columns Layout
spacing:
blocks:
  _component: "building-blocks/wrappers/grid"
  layout: uneven-columns
  minItemWidth: 0
  maxItemWidth: 320
  items:
    - contentBlocks:
        - _component: "building-blocks/wrappers/card"
          paddingHorizontal: md
          paddingVertical: md
          rounded: true
          border: true
          contentBlocks:
            - _component: "building-blocks/core-elements/heading"
              text: "Short"
              level: h3
            - _component: "building-blocks/core-elements/text"
              text: "Short content."
    - contentBlocks:
        - _component: "building-blocks/wrappers/card"
          paddingHorizontal: md
          paddingVertical: md
          rounded: true
          border: true
          contentBlocks:
            - _component: "building-blocks/core-elements/heading"
              text: "Medium"
              level: h3
            - _component: "building-blocks/core-elements/text"
              text: "This card is a little longer."
    - contentBlocks:
        - _component: "building-blocks/wrappers/card"
          paddingHorizontal: md
          paddingVertical: md
          rounded: true
          border: true
          contentBlocks:
            - _component: "building-blocks/core-elements/heading"
              text: "Much Longer Card"
              level: h3
            - _component: "building-blocks/core-elements/text"
              text: "This card demonstrates how the uneven-columns layout handles longer content."
---
