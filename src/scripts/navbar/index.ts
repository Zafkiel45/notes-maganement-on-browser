/*
  This is the entry point to Navbar scripts. There is any util function related
  to navbar, important imports, and exports.
*/ 
import './modal/folderModal';
import './modal/noteModal';

import { attachClickEvents } from './modal/events/mouse.navbar';
import { attachKeyEvents } from './modal/events/keyboard.navbar';

import type { DivElement } from './types/htmlElements';

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

window.addEventListener("load", () => {
  attachClickEvents();
  attachKeyEvents();
});
