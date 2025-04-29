function toggleModal(state: boolean, element: HTMLDivElement) {
  if (state) {
    element.classList.remove("hidden");
    element.classList.add("flex");
    element.focus();
  } else {
    element.classList.remove("flex");
    element.classList.add("hidden");
  }
}

// ---------- Actions for modals ---------- //
window.addEventListener("load", () => {
  const modals = document.querySelectorAll(
    ".modals"
  ) as NodeListOf<HTMLDivElement>;
  const modalContent = document.querySelectorAll(
    ".modal-content"
  ) as NodeListOf<HTMLDivElement>;
  // add key event to modal
  modals.forEach((modal) => {
    modal.setAttribute("tabindex", "-1");
    modal.addEventListener("keydown", (e) => {
      if (e.key.toLowerCase() === "escape") {
        modal.classList.remove("flex");
        modal.classList.add("hidden");
      }
    });
  });
  // add click event to modal. When the overlay is clicked, the modal close
  modals.forEach((modal, idx) => {
    modal.addEventListener("click", (e) => {
      toggleModal(false, modal);
    });

    modalContent[idx].addEventListener("click", (e) => {
      e.stopPropagation();
    });
  });
});
