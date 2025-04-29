import { toggleModal } from "..";
import type { DivElement, BtnElement, InputElement, UListElement } from "../types/htmlElements";
import { deleteNoteEvent, editNoteEvent } from "../../notesOptions";

const openModalBtn = document.querySelector("#openModal") as BtnElement;
const modal = document.querySelector("#modal") as DivElement;
const closeModalBtn = document.querySelector("#closeModal") as BtnElement;
const createNoteBtn = document.querySelector("#createNote") as BtnElement;
const fileList = document.querySelector('#fileList') as UListElement;

openModalBtn.addEventListener("click", () => {
  toggleModal(true, modal);
});

closeModalBtn.addEventListener("click", () => {
  toggleModal(false, modal);
});

createNoteBtn.addEventListener("click", async () => {
  const noteName = (document.querySelector("#noteName") as InputElement).value;
  const selectedFolder = document.querySelector('input[name="folder"]:checked');
  const noteFolder = (selectedFolder as InputElement).value; 
  const noteContent = (document.querySelector("#noteEditor") as HTMLTextAreaElement).value;

  try {
    console.log('called')
    await fetch("http://localhost:3001/note", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        name: noteName,
        content: noteContent,
        folder: parseInt(noteFolder),
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
    const copyName = linkToEndpoint.querySelector('div') as DivElement;

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