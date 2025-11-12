---
title: Card with Before Content
spacing:
blocks:
  _component: "building-blocks/wrappers/card"
  border: true
  paddingHorizontal: lg
  paddingVertical: lg
  rounded: true
  beforeContentBlocks:
    - _component: "building-blocks/core-elements/image"
      source: "/src/assets/images/component-library/dunedin-cliff.jpg"
      alt: "Dunedin Cliff"
      aspectRatio: widescreen
  contentBlocks:
    - _component: "building-blocks/core-elements/heading"
      text: "Card with Before Content"
      level: h3
    - _component: "building-blocks/core-elements/text"
      text: "The image above is placed in the beforeContentBlocks area, which sits outside the card's internal padding. This is perfect for hero images or visual headers."
  style: "max-width: 400px; margin-inline: auto;"
---
