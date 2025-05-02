import type { DivElement } from "../../types/htmlElements";
import { addClass, removeClass } from "../../utils/utlity.navbar";
const modals = document.querySelectorAll(".modals") as NodeListOf<DivElement>;

document.addEventListener('astro:page-load', () => {
  const modals = document.querySelectorAll(".modals") as NodeListOf<DivElement>;

  function attachKeyEvents() {
    modals.forEach((modal) => {
      modal.setAttribute("tabindex", "-1");
      modal.addEventListener("keydown", (e) => {
        if (e.key.toLowerCase() === "escape") {
          removeClass(modal, 'flex');
          addClass(modal, 'hidden');
        };
      });
    });
  };

  attachKeyEvents();
});

export function attachKeyEvents() {
  modals.forEach((modal) => {
    modal.setAttribute("tabindex", "-1");
    modal.addEventListener("keydown", (e) => {
      if (e.key.toLowerCase() === "escape") {
        removeClass(modal, 'flex');
        addClass(modal, 'hidden');
      };
    });
  });
}