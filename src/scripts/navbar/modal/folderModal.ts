import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstCharacter";
import type {
  DivElement,
  BtnElement,
  InputElement,
  UListElement,
} from "../types/htmlElements";
import { toggleModal } from "../utils/utlity.navbar";

document.addEventListener("astro:page-load", () => {
  const folderNameInput = document.querySelector(
    "#folderNameInput"
  ) as InputElement;
  const folderCreateBtn = document.querySelector(
    "#createFolderBtn"
  ) as BtnElement;
  const folderModal = document.querySelector("#folderModal") as DivElement;
  const folderModalCloseBtn = document.querySelector(
    "#closeFolderModal"
  ) as BtnElement;
  const folderOpenModalBtn = document.querySelector(
    "#openFolderModal"
  ) as BtnElement;

  folderOpenModalBtn.addEventListener("click", () => {
    toggleModal(true, folderModal);
  });

  folderModalCloseBtn.addEventListener("click", () => {
    toggleModal(false, folderModal);
  });

  folderCreateBtn.addEventListener("click", async () => {
    await createFolder();
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
        if (answer.status === 409) {
          return;
        }
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

  const folderList = document.querySelector("#navbar-folders") as UListElement;

  function createFolderNode(name: string) {
    try {
      const lastChild = folderList.lastElementChild;

      if (typeof lastChild === "undefined" || lastChild === null) {
        window.location.reload();
        return;
      }

      const lastChildCopy = lastChild.cloneNode(true) as HTMLElement;
      const currentHref = lastChildCopy.getAttribute("href")?.split("/");
      const folderName = lastChildCopy.querySelector(".folder-name") as DivElement;

      if(!currentHref) {
        window.alert('BAD ERROR!')
        return;
      };

      const currentFolderId = parseInt(currentHref[2]) + 1
      console.log(currentFolderId)
      lastChildCopy.removeAttribute("href");
      lastChildCopy.setAttribute("href", `/folders/${currentFolderId}/filesTypes`);
      folderName.textContent = name;

      folderList.appendChild(lastChildCopy);
      return;
    } catch (err) {
      console.error(err);
    }
  }
});
