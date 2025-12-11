---
_schema: default
title: Search
pageSections:
  - _component: page-sections/heroes/hero-center
    heading: Search
    subtext: Everything on the site, one search away.
    colorScheme: default
    backgroundColor: base
    paddingVertical: 4xl

  - _component: page-sections/builders/custom-section
    maxContentWidth: xl
    paddingHorizontal: xl
    paddingVertical: 2xl
    colorScheme: default
    backgroundColor: base
    contentSections:
      - _component: building-blocks/core-elements/raw-html
        html: |
          <link href="/pagefind/pagefind-ui.css" rel="stylesheet">
          <script src="/pagefind/pagefind-ui.js"></script>
          <div id="search"></div>
          <script>
              window.addEventListener('DOMContentLoaded', (event) => {
                  new PagefindUI({ element: "#search", showSubResults: true });
              });
          </script>
---
