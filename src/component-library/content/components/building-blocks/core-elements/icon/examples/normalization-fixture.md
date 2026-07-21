---
title: "Fallback & Normalization (QA fixture)"
spacing: "all"
blocks:
  - _component: "building-blocks/core-elements/icon"
    name: star
    size: lg
    style: "margin-inline-end: .5rem;"
    title: "Valid local icon name"
  - _component: "building-blocks/core-elements/icon"
    name: social/facebook
    size: lg
    style: "margin-inline-end: .5rem;"
    title: "Valid nested icon name"
  - _component: "building-blocks/core-elements/icon"
    name: "fas fa-tree"
    size: lg
    style: "margin-inline-end: .5rem;"
    title: "Invalid/unconverted name -- must render the sparkles fallback, not throw"
---
