import { deleteNoteEvent } from "./notesOptions";
import { editNoteEvent } from "./notesOptions";



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

// ---------- CREATE MODAL ---------- //

const openModalBtn = document.querySelector("#openModal") as HTMLButtonElement;
const modal = document.querySelector("#modal") as HTMLDivElement;
const closeModalBtn = document.querySelector("#closeModal") as HTMLButtonElement;
const createNoteBtn = document.querySelector("#createNote") as HTMLButtonElement;
const fileList = document.querySelector('#fileList') as HTMLUListElement;

openModalBtn.addEventListener("click", () => {
  toggleModal(true, modal);
});

closeModalBtn.addEventListener("click", () => {
  toggleModal(false, modal);
});

createNoteBtn.addEventListener("click", async () => {
  const noteName = (document.querySelector("#noteName") as HTMLInputElement).value;
  const selectedFolder = (document.querySelector('input[name="folder"]:checked') as HTMLInputElement).value;
  const noteContent = (document.querySelector("#noteEditor") as HTMLTextAreaElement).value;
  try {
    console.log('called')
    await fetch("http://localhost:3001/note", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        name: noteName,
        content: noteContent,
        folder: parseInt(selectedFolder),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const targetChild = fileList.lastElementChild;

    if(targetChild === null) {
      window.location.reload();
      return;
    };
    const targetChildId = parseInt(targetChild.getAttribute('data-id') as string);
    const copyOfTarget = targetChild.cloneNode(true) as HTMLElement;
    const copyId = String(targetChildId + 1);
    const linkToEndpoint = copyOfTarget.querySelector('a') as HTMLAnchorElement;
    const copyName = linkToEndpoint.querySelector('div') as HTMLDivElement;

    copyOfTarget.removeAttribute('data-id');
    copyOfTarget.setAttribute('data-id', copyId);

    linkToEndpoint.removeAttribute('href');
    linkToEndpoint.setAttribute('href', `/docs/${copyId}/files`); 

    deleteNoteEvent(copyOfTarget);
    editNoteEvent(copyOfTarget);

    copyName.textContent = noteName;

    fileList.appendChild(copyOfTarget);
  } catch (err) {
    console.error(err);
  };
});

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
