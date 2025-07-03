document.addEventListener("DOMContentLoaded", () => {
  // Find all component viewers on the page
  const componentViewers = document.querySelectorAll(".component-viewer");

  componentViewers.forEach((viewer) => {
    const viewCodeBtn = viewer.querySelector('[data-action="view-code"]') as HTMLElement;
    const viewComponentBtn = viewer.querySelector('[data-action="view-component"]') as HTMLElement;
    const previews = viewer.querySelectorAll(".preview");
    const codeBlocks = viewer.querySelectorAll(".code");

    if (viewCodeBtn && viewComponentBtn) {
      viewCodeBtn.addEventListener("click", () => {
        // Hide view-code button and show view-component button
        viewCodeBtn.classList.add("hide");
        viewComponentBtn.classList.remove("hide");

        // Hide all previews and show all code blocks in this viewer only
        previews.forEach((preview) => {
          (preview as HTMLElement).style.display = "none";
        });

        codeBlocks.forEach((codeBlock) => {
          (codeBlock as HTMLElement).style.display = "block";
        });
      });

      viewComponentBtn.addEventListener("click", () => {
        // Show view-code button and hide view-component button
        viewCodeBtn.classList.remove("hide");
        viewComponentBtn.classList.add("hide");

        // Show active preview and hide all code blocks in this viewer only
        previews.forEach((preview) => {
          if (preview.classList.contains("active")) {
            (preview as HTMLElement).style.display = "block";
          } else {
            (preview as HTMLElement).style.display = "none";
          }
        });

        codeBlocks.forEach((codeBlock) => {
          (codeBlock as HTMLElement).style.display = "none";
        });
      });
    }
  });
});
