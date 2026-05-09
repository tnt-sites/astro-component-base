---
_schema: landing-page
title: New Patient Split Banner Test
landingMainNav:
  - _component: navigation/landing/landing-header
    logoSource: /images/logo.svg
    logoAlt: Logo
    pageButtons:
      - _component: building-blocks/core-elements/button
        id: ""
        text: Request an Appointment
        hideText: false
        link: /request-an-appointment/
        modalTarget: ""
        iconName: ""
        iconPosition: before
        variant: primary
        size: md
        width: md
landingFooter:
  - _component: navigation/landing/landing-footer
    logoSource: /images/logo.svg
    logoAlt: Logo
    siteName: Dental Practice
    contactTitle: Learn More
    legalLinks:
      - name: Sitemap
        path: sitemap.html
      - name: Privacy Policy
        path: privacy-policy.html
    offices:
      - name: ""
        addresses:
          - lines:
              - 123 Main Street
              - Suite 100
            city: Anytown
            state: FL
            postalCode: "00000"
            country: USA
            mapUrl: ""
        phones:
          - display: (555) 555-5555
            href: tel:+15555555555
        officeHours:
          - label: Monday
            hours: "8:00 am – 5:00 pm"
          - label: Tuesday
            hours: "8:00 am – 5:00 pm"
          - label: Wednesday
            hours: "8:00 am – 5:00 pm"
          - label: Thursday
            hours: "8:00 am – 5:00 pm"
          - label: Friday
            hours: By Appt Only
    mapEmbedUrl: ""
    backgroundImage:
      source: ""
      alt: ""
      positionVertical: top
      positionHorizontal: center
    backgroundGradient: ""
landingPageSections:
  - _component: landing-page-components/new-patient-split-banner/top-bar
    id: ""
    backgroundColor: brand
    textColor: "var(--color-text-inverse)"
    items:
      - New Patients Welcome
      - Same-Day Appointments Available
  - _component: landing-page-components/new-patient-split-banner/banner
    id: ""
    backgroundColor: base
    subheading: Your City's
    heading: "Top-Rated<br>Dental Expert"
    text: ""
    badgeImage:
      source: ""
      alt: ""
    image:
      source: https://placehold.co/800x700
      alt: Doctor photo
    figcaption: Dr. Jane Smith
    buttonSections: []
  - _component: landing-page-components/new-patient-split-banner/insurance
    id: ""
    backgroundColor: surface
    blocks:
      - heading: Dental Insurance Welcome
        text: >-
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. We welcome dental insurance as a partner in making exceptional dentistry affordable. Our team will help you understand and maximize your benefits.
      - heading: "No Insurance?<br> No Worries!"
        text: >-
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. We offer an in-house Dental Savings Plan. For a low monthly fee, individuals and families can receive routine preventive care along with significant discounts on other services. No limits. No deductibles. No surprises.
  - _component: landing-page-components/new-patient-split-banner/count
    id: ""
    backgroundColor: base
    items:
      - image:
          source: https://placehold.co/80x80
          alt: ""
        text: "Personalized<br>Cosmetic<br>Dentistry"
      - image:
          source: https://placehold.co/80x80
          alt: ""
        text: "Extensive<br>Training &<br>Experience"
      - image:
          source: https://placehold.co/80x80
          alt: ""
        text: "Comfortable<br>Office<br>Atmosphere"
      - image:
          source: https://placehold.co/80x80
          alt: ""
        text: "Team of Highly<br>Qualified<br>Professionals"
  - _component: landing-page-components/new-patient-split-banner/split-section
    id: services
    backgroundColor: base
    headingPrefix: ""
    heading: Services We Offer
    listItems:
      - Service One
      - Service Two
      - Service Three
      - Service Four
      - Service Five
      - Service Six
      - Service Seven
    image:
      source: https://placehold.co/480x400
      alt: Our Office
    figcaption: Our Office
    reverse: false
    twoColumnList: true
    headingColor: "var(--color-text)"
    prefixColor: "var(--color-text)"
  - _component: landing-page-components/new-patient-split-banner/reviews
    id: ""
    backgroundColor: base
    backgroundImage:
      source: https://placehold.co/1920x600
      alt: ""
    heading: Hear From Our Patients
    reviewText: >-
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. The team was incredibly kind and professional. I would highly recommend this practice to anyone looking for a great dental experience!
    author: Jane D.
    googleLogoImage:
      source: ""
      alt: Google Reviews
    starColor: "#FEBB21"
  - _component: landing-page-components/new-patient-split-banner/split-section
    id: about
    backgroundColor: base
    headingPrefix: Learn More
    heading: About Our Practice
    listItems:
      - Friendly, Caring Dental Team
      - Same-Day Dentistry
      - Convenient Local Location
      - State-of-the-Art Dental Office
    image:
      source: https://placehold.co/480x400
      alt: Our Dental Team
    figcaption: Our Amazing Dental Team
    reverse: true
    twoColumnList: false
    headingColor: "var(--color-text)"
    prefixColor: "var(--color-text)"
---
