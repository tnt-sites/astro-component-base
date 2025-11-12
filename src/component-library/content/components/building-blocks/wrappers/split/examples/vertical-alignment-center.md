---
title: Center Alignment
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

            This is verbose content for side A. We're making this column longer so we can highlight how the alignment works.

            Here's even more text to help illustrate the point we're trying to make with this demonstration.

            And here's even more text to really drive the point home.
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
  distributionMode: "half"
  fixedWidth: null
  verticalAlignment: "center"
  reverse: false
---
