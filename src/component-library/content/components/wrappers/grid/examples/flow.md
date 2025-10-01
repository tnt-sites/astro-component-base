---
title: Flow Layout
spacing:
blocks:
  _bookshop_name: "wrappers/grid"
  layout: flow
  minItemWidth: 0
  maxItemWidth: 320
  items:
    - contentBlocks:
        - _bookshop_name: "wrappers/card"
          paddingHorizontal: md
          paddingVertical: md
          rounded: true
          border: true
          contentBlocks:
            - _bookshop_name: "typography/heading"
              text: "Short"
              level: h3
            - _bookshop_name: "typography/simple-text"
              text: "Short content."
    - contentBlocks:
        - _bookshop_name: "wrappers/card"
          paddingHorizontal: md
          paddingVertical: md
          rounded: true
          border: true
          contentBlocks:
            - _bookshop_name: "typography/heading"
              text: "Medium"
              level: h3
            - _bookshop_name: "typography/simple-text"
              text: "This card is a little longer."
    - contentBlocks:
        - _bookshop_name: "wrappers/card"
          paddingHorizontal: md
          paddingVertical: md
          rounded: true
          border: true
          contentBlocks:
            - _bookshop_name: "typography/heading"
              text: "Much Longer Card"
              level: h3
            - _bookshop_name: "typography/simple-text"
              text: "This card demonstrates how the Flow layout handles longer content."
---
