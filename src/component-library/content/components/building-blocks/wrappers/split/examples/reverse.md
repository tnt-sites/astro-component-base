---
title: Reversed
spacing:
blocks:
  _component: "building-blocks/wrappers/split"
  firstColumnContentBlocks:
    - _component: "building-blocks/wrappers/container"
      backgroundColor: "accent"
      paddingHorizontal: sm
      paddingVertical: sm
      contentBlocks:
        - _component: "building-blocks/core-elements/text"
          text: |-
            ## Side A

            This is content for side A.
  secondColumnContentBlocks:
    - _component: "building-blocks/wrappers/container"
      backgroundColor: "highlight"
      paddingHorizontal: sm
      paddingVertical: sm
      contentBlocks:
        - _component: "building-blocks/core-elements/text"
          text: |-
            ## Side B

            This is content for side B.
  distributionMode: "third-two-thirds"
  fixedWidth: null
  verticalAlignment: "top"
  reverse: true
---
