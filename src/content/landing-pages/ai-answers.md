---
_schema: landing-page-ai-answers
title: New AI Answers Landing Page
landingStyle: ai-answers
landingMainNav:
  - _component: navigation/landing/landing-header
    logoSource: /images/logo.svg
    logoAlt: Logo
    pageButtons:
      - _component: building-blocks/core-elements/button
        id: ''
        text: Request an Appointment
        hideText: false
        link: /new-patient-special-form/
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
landingFooter:
  - _component: navigation/landing/landing-footer
    logoSource: /images/logo.svg
    logoAlt: Logo
    siteName: Dental Studio
    contactTitle: Contact Us
    pageButtons:
      - _component: building-blocks/core-elements/button
        id: ''
        text: Request an Appointment
        hideText: false
        link: /request-an-appointment/
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
    socials:
      - label: Facebook
        icon: social/facebook
        link: https://facebook.com
      - label: Instagram
        icon: social/instagram
        link: https://instagram.com
    legalLinks:
      - name: Sitemap
        path: sitemap.html
      - name: Privacy Policy
        path: privacy-policy.html
    mapEmbedUrl: ''
    backgroundImage:
      positionVertical: top
      positionHorizontal: center
    backgroundGradient: ''
    backgroundColor: ''
    linkColor: ''
    linkHoverColor: ''
    legalBlurb: ''
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
landingPageSections:
  - _component: landing-page-components/ai-answers/banner/ai-answers-banner
    backgroundColor: surface
    heading: Want a new smile?<br>Confused?<br>Need Answers?
    consultationTitle: Request a Free Consultation<br>with Our Doctors
    consultationItems:
      - no cost
      - no strings attached
      - no obligations
      - just honest answers
    image:
      source: /assets/images/lp-implants-ai-banner.png
      alt: AI consultation banner image
    borderColor: var(--color-brand-secondary)
    titleBackground: black
    titleColor: white
  - _component: landing-page-components/ai-answers/reviews/ai-answers-reviews
    id: ''
    backgroundColor: none
    heading: Hear More From<br>Some of Our Actual Patients
    image:
      source: https://placehold.co/400x300
      alt: Patients smiling
    headingColor: '#2691CA'
    borderColor: var(--color-brand-secondary)
    starColor: '#febb21'
    reviews:
      - googleLogo:
          source: ''
          alt: Google Reviews
        text: >-
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam.
        author: '- Lorem A.'
      - googleLogo:
          source: ''
          alt: Google Reviews
        text: >-
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident.
        author: '- Ipsum B.'
      - googleLogo:
          source: ''
          alt: Google Reviews
        text: >-
          Sunt in culpa qui officia deserunt mollit anim id est laborum.
          Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames.
        author: '- Dolor C.'
head_scripts: []
footer_scripts: []
extraFonts: []
---
