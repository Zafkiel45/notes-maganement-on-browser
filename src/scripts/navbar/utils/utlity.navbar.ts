import type { DivElement } from "../types/htmlElements";

// utility function to nav
export function toggleModal(state: boolean, element: DivElement) {
  if (state) {
    removeClass(element, 'hidden');
    addClass(element, 'flex');
    element.focus();
  } else {
    removeClass(element, 'flex');
    addClass(element, 'hidden');
  };
};

export function removeClass(target: HTMLElement, ...targetClass: string[]) {
  target.classList.remove(...targetClass);
};

export function addClass(target: HTMLElement, ...targetClass: string[]) {
  target.classList.add(...targetClass);
};
