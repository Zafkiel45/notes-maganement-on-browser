import { toggleModal } from "../..";

const modals = document.querySelectorAll(".modals") as NodeListOf<HTMLDivElement>;
const modalContent = document.querySelectorAll( ".modal-content") as NodeListOf<HTMLDivElement>;

// add click event to modal. When the overlay is clicked, the modal close
export function attachClickEvents() {
  modals.forEach((modal, idx) => {
    modal.addEventListener("click", () => {
      toggleModal(false, modal);
    });
  
    modalContent[idx].addEventListener("click", (e) => {
      e.stopPropagation();
    });
  });
}