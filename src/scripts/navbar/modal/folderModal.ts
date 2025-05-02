import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstCharacter";
import type {
  DivElement,
  BtnElement,
  InputElement,
} from "../types/htmlElements";
import { addClass, removeClass, toggleModal } from "../utils/utlity.navbar";
import { createFolderNode } from "../folders/folderList";

// related to generics  elements
const modalError = document.querySelector("#modalError") as DivElement;
const modalSuccess = document.querySelector("#modalSuccess") as DivElement;
const modalSuccessMessage = document.querySelector("#modalSuccessMessage") as DivElement;
const modalErrorMessage = document.querySelector("#modalErrorMessage") as DivElement;
// related modal itself
const folderModal = document.querySelector("#folderModal") as DivElement;
const folderModalCloseBtn = document.querySelector("#closeFolderModal") as BtnElement;
const folderNameInput = document.querySelector("#folderNameInput") as InputElement;
const folderCreateBtn = document.querySelector("#createFolderBtn") as BtnElement;
const folderOpenModalBtn = document.querySelector("#openFolderModal") as BtnElement;

document.addEventListener("astro:page-load", () => {
  const folderModal = document.querySelector("#folderModal") as DivElement;
  const folderModalCloseBtn = document.querySelector("#closeFolderModal") as BtnElement;
  const folderOpenModalBtn = document.querySelector("#openFolderModal") as BtnElement;

  folderOpenModalBtn.addEventListener("click", () => {
    toggleModal(true, folderModal);
  });
  
  folderModalCloseBtn.addEventListener("click", () => {
    toggleModal(false, folderModal);
  });

  folderCreateBtn.addEventListener("click", async () => {
    await createFolder();
  });
});

folderOpenModalBtn.addEventListener("click", () => {
  toggleModal(true, folderModal);
});

folderModalCloseBtn.addEventListener("click", () => {
  toggleModal(false, folderModal);
});

const createFolder = async () => {
  try {
    const folderName = capitalizeFirstLetter(folderNameInput.value);

    await fetch("http://localhost:3001/folders", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ folderName: folderName }),
    }).then((answer) => {
      if (answer.status === 409) {return} 
      createFolderNode(folderName); 
    });

    return;
  } catch (err) {
    console.error(err);
  }
};

folderCreateBtn.addEventListener("click", async () => {
  await createFolder();
});
