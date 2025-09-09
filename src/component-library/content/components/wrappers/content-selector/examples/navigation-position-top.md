---
title: Top Navigation
spacing: all
blocks:
  _bookshop_name: "wrappers/content-selector"
  navigationPosition: top
  items:
    - title: FAQ
      sub_text: Common questions
      icon_name: question-mark-circle
      contentBlocks:
        - _bookshop_name: primitives/heading
          text: "Frequently asked questions"
          level: h2
          align: start
        - _bookshop_name: primitives/rich-text
          text: |
            **Do you offer support?** Yes — email us anytime.

            **Can I cancel?** Yes, you can cancel anytime.
          align: start
          size: md
    - title: Shipping
      sub_text: How we deliver
      icon_name: truck
      contentBlocks:
        - _bookshop_name: primitives/simple-text
          text: |
            We ship worldwide. Orders leave within 2 business days.
            Delivery times vary by region.
          align: start
          size: md
        - _bookshop_name: primitives/list
          items:
            - text: "NZ & AU: 2–5 days"
              icon: clock
            - text: "US & EU: 5–10 days"
              icon: globe-alt
          direction: vertical
          horizontalAlignment: start
          size: md
    - title: Returns
      sub_text: Easy and fair
      icon_name: arrow-path
      contentBlocks:
        - _bookshop_name: primitives/simple-text
          text: "30‑day returns. Unused items only. Full refund once received."
          align: start
          size: md
        - _bookshop_name: primitives/button
          text: Start a return
          link: #
          variant: secondary
          size: md
---
