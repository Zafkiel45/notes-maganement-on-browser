import type { BtnElement, DivElement } from "../../types/htmlElements";
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

    modals.forEach((modal) => {
      modal.addEventListener('keydown', (key: KeyboardEvent) => {
        if(key.key === 'Enter') {
          try {
            const confirmBtn = modal.querySelector('.confirm-btn') as BtnElement;
            confirmBtn.click();

            const successAdvice = modal.querySelector('.success-advice') as DivElement;
            successAdvice.style.display = 'flex';

            const successMessage = successAdvice.querySelector('.success-message') as DivElement;
            successMessage.textContent = 'O conteúdo foi editado com successo!'

            setTimeout(() => {
              successAdvice.style.display = 'none';
              successMessage.textContent = '';
            }, 3000);
            return; 
          } catch {
            const errorAdvice = modal.querySelector('.error-advice') as DivElement;
            errorAdvice.style.display = 'flex';

            const errorMessage = errorAdvice.querySelector('.error-message') as DivElement;
            errorMessage.textContent = 'Error desconhecido. A nota não foi editada';

            setTimeout(() => {
              errorAdvice.style.display = 'none';
              errorMessage.textContent = '';
            }, 3000);
            return;
          };
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