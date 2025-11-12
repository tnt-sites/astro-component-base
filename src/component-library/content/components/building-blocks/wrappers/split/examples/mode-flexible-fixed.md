---
title: Flexible Fixed Mode
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
            ## Flexible column

            This column takes up the remaining space.
  secondColumnContentBlocks:
    - _component: "building-blocks/wrappers/container"
      paddingHorizontal: sm
      paddingVertical: sm
      backgroundColor: "highlight"
      contentBlocks:
        - _component: "building-blocks/core-elements/text"
          text: |-
            ## Fixed column

            This column has a fixed width.
  distributionMode: "flexible-fixed"
  fixedWidth: null
  minSplitWidth: 500
  verticalAlignment: "top"
  reverse: false
---
