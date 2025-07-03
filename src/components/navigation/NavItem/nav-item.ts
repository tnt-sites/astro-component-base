function setupDropdowns() {
  const toggles = document.querySelectorAll(".nav-item-toggle");

  toggles.forEach((toggle) => {
    toggle.addEventListener("change", (e) => {
      const target = e.target as HTMLInputElement;
      const label = document.querySelector(`label[for="${target.id}"]`);

      if (label) {
        label.setAttribute("aria-expanded", String(target.checked));
      }

      // If closing a dropdown, close all its children
      if (!target.checked) {
        const content = document.querySelector(`#${target.getAttribute("aria-controls")}`);

        if (content) {
          const childToggles = content.querySelectorAll(".nav-item-toggle");

          childToggles.forEach((childToggle) => {
            if (childToggle instanceof HTMLInputElement) {
              childToggle.checked = false;
              const childLabel = document.querySelector(`label[for="${childToggle.id}"]`);

              if (childLabel) {
                childLabel.setAttribute("aria-expanded", "false");
              }
            }
          });
        }
      }
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupDropdowns);
} else {
  setupDropdowns();
}
