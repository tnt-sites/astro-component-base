---
_schema: landing-page-pediatric-waves
title: Pediatric Wave Landing Page
landingStyle: pediatric-waves
landingMainNav:
  - _component: navigation/landing/landing-header-pediatric-waves
    logoSource: /images/logo.svg
    logoAlt: Logo
    pageButtons:
      - _component: building-blocks/core-elements/button
        id: ''
        text: Request an Appointment
        hideText: false
        link: /em-special-form/
        modalTarget: ''
        iconName: ''
        iconPosition: before
        variant: primary
        size: md
        width: md
        borderRadius: default
        borderWidth: default
        borderColor: default
        textColor: default
        uppercase: false
    offices: []
    mobileCallLabel: Call
    mobileMapLabel: Map
    mobileMapHref: ''
    mobileBarBackground: ''
    mobileCallBackground: '#23adce'
    mobileApptBackground: '#dbe45a'
    mobileMapBackground: '#0d5f78'
landingFooter:
  - _component: navigation/landing/landing-footer-pediatric-waves
    logoSource: /images/logo.svg
    logoAlt: Logo
    contactTitle: Contact Us
    offices:
      - name: ''
        phones:
          - display: (123) 456-7890
            href: tel:+11234567890
        addresses:
          - lines:
              - 123 Main Street
              - Suite 200
            city: Dunedin
            state: FL
            postalCode: '34698'
            country: USA
            mapUrl: https://maps.google.com
        officeHours: []
        officeHoursNote: ''
    phoneLinkColor: brand
    phoneLinkHoverColor: brand-secondary
    addressLinkColor: brand
    addressLinkHoverColor: brand-secondary
    legalLinks:
      - name: Sitemap
        path: sitemap.html
      - name: Privacy Policy
        path: privacy-policy.html
    legalBlurb: ''
    linkColor: brand
    linkHoverColor: brand-secondary
    formHeading: Ask a Question
    formAction: ''
    formBlocks:
      - _component: building-blocks/forms/input
        id: ''
        label: Name
        name: Name
        type: text
        placeholder: Name
        required: true
      - _component: building-blocks/forms/input
        id: ''
        label: Phone
        name: Phone
        type: text
        placeholder: Phone
        required: true
      - _component: building-blocks/forms/input
        id: ''
        label: Email
        name: Email
        type: email
        placeholder: Email
        required: true
      - _component: building-blocks/forms/textarea
        id: ''
        label: Comments
        name: CommentArea
        required: false
        placeholder: Comments
      - _component: building-blocks/forms/hidden
        id: ''
        name: _subject
        value: Pediatric Footer Questions
      - _component: building-blocks/forms/submit
        id: ''
        text: Send
        variant: primary
        size: md
        iconPosition: before
        hideText: false
        disabled: false
        class: footer-submit-button
    mapEmbedUrl: ''
    questionsLine: Have Questions? Get Answers
    backgroundColor: brand-secondary
    officeHoursAlignment: right
    siteName: Dental Studio
    socials:
      - label: Facebook
        icon: social/facebook
        link: https://facebook.com
      - label: Instagram
        icon: social/instagram
        link: https://instagram.com
landingPageSections: []
head_scripts: []
footer_scripts: []
extraFonts: []
---
