import { addClass, removeClass } from "../..";
import type { DivElement } from "../../types/htmlElements";
const modals = document.querySelectorAll(".modals") as NodeListOf<DivElement>;

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