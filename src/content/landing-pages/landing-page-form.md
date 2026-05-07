---
title: Landing Page Form
landingPageSections:
  - _component: landing-page-components/shared/landing-page-form
    id: ""
    heading: Request an Appointment
    formAction: ""
    formBlocks:
      - _component: building-blocks/forms/input
        label: Name
        name: Name
        type: text
        placeholder: Name
        required: true
      - _component: building-blocks/forms/input
        label: Phone Number
        name: Phone
        type: text
        placeholder: Phone
        required: true
      - _component: building-blocks/forms/input
        label: Email Address
        name: email
        type: email
        placeholder: Email
        required: true
      - _component: building-blocks/forms/select
        label: Are you a new or existing patient?
        name: Patient
        placeholder: Are You A New Or Existing Patient?
        options:
          - value: New Patient
            label: New Patient
          - value: Existing Patient
            label: Existing Patient
      - _component: building-blocks/forms/select
        label: How did you hear about us?
        name: Discover
        placeholder: How Did You Hear About Us?
        options:
          - value: search engine
            label: Search Engine
          - value: family
            label: Family/Friend
          - value: promotion
            label: Promotion
          - value: social media
            label: Social Media
          - value: other
            label: Other
      - _component: building-blocks/forms/textarea
        label: Comments
        name: CommentArea
        placeholder: Comments
      - _component: building-blocks/forms/hidden
        name: _subject
        value: New Patient Request an Appointment
      - _component: building-blocks/forms/hidden
        name: _redirect
        value: thanks.html
      - _component: building-blocks/forms/submit
        text: Send
        variant: primary
    backgroundColor: base
    backgroundGradient: ""
    backgroundImage:
      source: null
      alt: null
      positionVertical: top
      positionHorizontal: center
---
