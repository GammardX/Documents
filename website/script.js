document.addEventListener("DOMContentLoaded", () => {
  const toggleElements = document.querySelectorAll(".toggle-section, .toggle-subsection");

  toggleElements.forEach(header => {
    const content = header.nextElementSibling;
    if (!content) return;

    header.style.cursor = "pointer";

    // Stato iniziale: visibile
    content.style.display = "block";
    content.dataset.visible = "true";
    header.classList.remove("collapsed");

    header.addEventListener("click", () => {
      const currentlyVisible = content.dataset.visible === "true";
      const newVisible = !currentlyVisible;

      content.style.display = newVisible ? "block" : "none";
      content.dataset.visible = newVisible ? "true" : "false";

      if (newVisible) {
        header.classList.remove("collapsed");
      } else {
        header.classList.add("collapsed");
      }
    });
  });
});
