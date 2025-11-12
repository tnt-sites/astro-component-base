---
title: Fixed Flexible Mode
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
            ## Fixed column

            This column has a fixed width.
  secondColumnContentBlocks:
    - _component: "building-blocks/wrappers/container"
      backgroundColor: "highlight"
      paddingHorizontal: sm
      paddingVertical: sm
      contentBlocks:
        - _component: "building-blocks/core-elements/text"
          text: |-
            ## Flexible column

            This column takes up the remaining space.
  distributionMode: "fixed-flexible"
  fixedWidth: null
  minSplitWidth: 500
  verticalAlignment: "top"
  reverse: false
---
