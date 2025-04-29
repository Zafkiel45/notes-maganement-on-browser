import { toggleModal } from "..";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstCharacter";
import type { DivElement, BtnElement, InputElement} from "../types/htmlElements";
import { removeClass, addClass} from "..";
// related to generics  elements
const modalError = document.querySelector("#modalError") as DivElement;
const modalSuccess = document.querySelector("#modalSuccess") as DivElement;
const modalSuccessMessage = document.querySelector( "#modalSuccessMessage") as DivElement;
const modalErrorMessage = document.querySelector("#modalErrorMessage") as DivElement;
// related modal itself
const folderModal = document.querySelector("#folderModal") as DivElement;
const folderModalCloseBtn = document.querySelector("#closeFolderModal") as BtnElement;
const folderNameInput = document.querySelector("#folderNameInput") as InputElement;
const folderCreateBtn = document.querySelector("#createFolderBtn") as BtnElement;
const folderOpenModalBtn = document.querySelector("#openFolderModal") as BtnElement;

folderOpenModalBtn.addEventListener("click", () => {
  toggleModal(true, folderModal);
});

folderModalCloseBtn.addEventListener("click", () => {
  toggleModal(false, folderModal);
});

const createFolder = async () => {
  try {
    const folderName = capitalizeFirstLetter(folderNameInput.value);

    if (folderName === "") {
      setTimeout(() => {
        removeClass(modalError, 'flex');
        addClass(modalError, 'hidden');
      }, 3000);

      removeClass(modalError, 'hidden');
      addClass(modalError, 'flex');
      modalErrorMessage.textContent = "Nome da pasta vazia";
      return;

    };

    await fetch("http://localhost:3001/folders", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ folderName: folderName }),
    }).then((answer) => {
      if (answer.status === 409) {
        // there is a possbility of extract this into util function
        setTimeout(() => {
          removeClass(modalError, 'flex');
          addClass(modalError, 'hidden');
        }, 3000);

        removeClass(modalError, 'hidden');
        addClass(modalError, 'flex');
        modalErrorMessage.textContent = "Nome da Pasta já existe";

        return;
      } else if (answer.status === 400) {
        setTimeout(() => {
          removeClass(modalError, 'flex');
          addClass(modalError, 'hidden');
        }, 3000);

        removeClass(modalError, 'hidden');
        addClass(modalError, 'flex');
        modalErrorMessage.textContent = "Nome da pasta vazia!";
      } else {
        setTimeout(() => {
          removeClass(modalSuccess, 'flex');
          addClass(modalSuccess, 'hidden');
        }, 3000);
        
        removeClass(modalSuccess, 'hidden');
        addClass(modalSuccess, 'flex');
        modalSuccessMessage.textContent = "Pasta criada com sucesso!";
      }
    });
  } catch (err) {
    console.error(err);
  }
};

folderCreateBtn.addEventListener("click", async () => {
  await createFolder();
});
