---
_schema: default
title: Your Site
pageBlocks:
  - _bookshop_name: wrappers/container
    label: ''
    contentBlocks:
      - _bookshop_name: typography/heading
        text: Welcome to your CloudCannon Starter Component site
        type: h1
        size:
        align: center
        iconName:
        iconPosition:
      - _bookshop_name: typography/definition-list
        items:
          - _component: definition-list-item
            title: >-
              12345678901234567890123456 123456789012
              345678901234567890123456789078901234567890123456789012
              345678901234567890
            text: werwerwerwerwerwerwerwer
        horizontalAlignment: start
      - _bookshop_name: wrappers/button-group
        buttonBlocks:
          - _bookshop_name: elements/button
            text: View Components
            link: /component-library/
            iconPosition: before
            hideText: false
            variant: primary
            size: lg
        direction: row
        align: center
      - _bookshop_name: forms/form
        action:
        formBlocks:
          - _bookshop_name: forms/choice-group
            title: Subscription
            name: subscription
            required: false
            options:
              - value: newsletter
                label: Subscribe to newsletter
                checked: false
              - value: updates
                label: Get product updates
                checked: false
            orientation: vertical
            multiple: true
          - _bookshop_name: forms/file-upload
            label: Upload a file
            name: file_upload
            required: false
            accept:
            multiple: true
          - _bookshop_name: forms/input
            label: Email Address
            name: email
            required: true
            type: email
            placeholder: youremail@email.com
            value:
          - _bookshop_name: forms/input
            label: Password
            name: password
            required: true
            type: password
            placeholder:
            value:
          - _bookshop_name: forms/input
            label: Your message
            name: message
            required: true
            type: text
            placeholder: Hello, I'd like one form and...
            value:
          - _bookshop_name: forms/input
            label: Telephone number
            name: telephone
            required: false
            type: tel
            placeholder: '+641234567'
            value:
          - _bookshop_name: forms/input
            label: Url
            name: url
            required: false
            type: url
            placeholder:
            value:
          - _bookshop_name: forms/input
            label: Age
            name: age
            required: false
            type: number
            placeholder:
            value:
          - _bookshop_name: forms/input
            label: Birth Date
            name: birthdate
            required: false
            type: date
            placeholder: 18/03/2025
            value:
          - _bookshop_name: forms/segments
            title: Which option would you like?
            name: options
            required: true
            options:
              - value: optionOne
                label: First Option
                checked: true
                icon: archive-box-arrow-down
              - value: optionTwo
                label: Second Option
                checked:
                icon: arrow-down
              - value: optionThree
                label: Last Option
                checked:
                icon: arrow-up-left
            iconOnly: false
            multiple: false
            keepStateOnRefresh: true
          - _bookshop_name: forms/select
            label: Which do you prefer?
            name: preferred_dinosaur
            required: true
            options:
              - value: option1
                label: Option 1
              - value: option2
                label: Option 2
              - value: option3
                label: Option 3
            placeholder:
            value:
          - _bookshop_name: forms/textarea
            label: The big message
            name: aBigMessage
            required: false
            placeholder: Hello, I'm writing here because...
            value:
    maxContentWidth: 2xl
    paddingHorizontal: lg
    paddingVertical: lg
    colorScheme:
    backgroundColor:
    backgroundImage:
      source: ''
      alt: ''
      positionVertical: top
      positionHorizontal: center
    rounded: false
---
