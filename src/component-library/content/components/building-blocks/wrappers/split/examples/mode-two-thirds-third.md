---
title: Two Thirds-Third
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
            ## Two thirds column

            This column takes up 66% of the available space.
  secondColumnContentBlocks:
    - _component: "building-blocks/wrappers/container"
      backgroundColor: "highlight"
      paddingHorizontal: sm
      paddingVertical: sm
      contentBlocks:
        - _component: "building-blocks/core-elements/text"
          text: |-
            ## Third column

            This column takes up 33% of the available space.
  distributionMode: "two-thirds-third"
  fixedWidth: null
  verticalAlignment: "top"
  reverse: false
---
