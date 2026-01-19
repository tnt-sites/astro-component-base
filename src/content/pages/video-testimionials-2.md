---
_schema: default
title: Video Testimonies
pageSections:
  - _component: page-sections/smile-galleries/smile-gallery-split
    heading: See what our patients say
    backgroundColor: base
    leftSlides:
      - _component: building-blocks/core-elements/image
        source: /src/assets/images/about-us-5.webp
        alt: About us image
        aspectRatio: widescreen
        editable: false
      - _component: building-blocks/core-elements/image
        source: /src/assets/images/about-us-1.jpg
        alt: ''
        aspectRatio: widescreen
        editable: false
      - _component: building-blocks/core-elements/image
        source: /src/assets/images/about-us-1.jpg
        alt: ''
        aspectRatio: widescreen
        editable: false
    rightSlides:
      - _component: building-blocks/core-elements/video
        type: youtube
        id: ZPxUsmRuaY4
        title: ''
        source: ''
        thumbnail: ''
      - _component: building-blocks/core-elements/video
        type: youtube
        id: Anbcd82U4tA
        title: ''
        source: ''
        thumbnail: ''
      - _component: building-blocks/core-elements/video
        type: youtube
        id: Anbcd82U4tA
        title: ''
        source: ''
        thumbnail: ''
    reverse: false
  - _component: page-sections/ctas/cta-form
    heading: Get in touch
    subtext: Fill out the form below and we'll get back to you as soon as possible.
    formAction: ./
    formBlocks:
      - _component: building-blocks/forms/input
        label: Name
        name: name
        type: text
        required: true
      - _component: building-blocks/forms/input
        label: Email
        name: email
        type: email
        required: true
      - _component: building-blocks/forms/textarea
        label: Message
        name: message
        required: true
      - _component: building-blocks/forms/submit
        text: Send message
        variant: primary
        size: md
        iconPosition: before
        hideText: false
        disabled: false
    imageSource: /src/assets/images/component-library/dunedin-cliff.jpg
    imageAlt: CTA image
    reverse: false
    colorScheme:
    backgroundColor: base
---
