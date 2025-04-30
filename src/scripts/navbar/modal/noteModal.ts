import { deleteNoteEvent, editNoteEvent } from "../../notesOptions.ts";
import { toggleModal } from "../utils/utlity.navbar";
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

document.addEventListener('astro:page-load', () => {
  const openModalBtn = document.querySelector("#openModal") as HTMLButtonElement;
  const modal = document.querySelector("#modal") as HTMLDivElement;
  const closeModalBtn = document.querySelector("#closeModal") as HTMLButtonElement;
  const createNoteBtn = document.querySelector("#createNote") as HTMLButtonElement;

  closeModalBtn.addEventListener("click", () => {
    toggleModal(false, modal);
  });

  openModalBtn.addEventListener("click", () => {
    toggleModal(true, modal);
  });

  createNoteBtn.addEventListener("click", () => {
     createNote();
  });
});

createNoteBtn.addEventListener("click", async () => {
  await createNote();
});

async function createNote() {
  const noteName = (document.querySelector("#noteName") as HTMLInputElement).value;
  const selectedFolder = document.querySelector('input[name="folder"]:checked');
  const noteFolder = (selectedFolder as HTMLInputElement).value; 
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
    const copyName = linkToEndpoint.querySelector('div') as HTMLDivElement;
    const copyEditSvg = copyOfTarget.querySelector('.edit-note') as SVGElement;
    const copyDeleteSvg = copyOfTarget.querySelector('.delete-note') as SVGElement;

    copyOfTarget.removeAttribute('data-id');
    copyOfTarget.setAttribute('data-id', copyId);

    copyEditSvg.removeAttribute('data-id');
    copyEditSvg.setAttribute('data-id', copyId);
    
    copyDeleteSvg.removeAttribute('data-id');
    copyDeleteSvg.setAttribute('data-id', copyId);

    linkToEndpoint.removeAttribute('href');
    linkToEndpoint.setAttribute('href', `/docs/${copyId}/files`); 


    deleteNoteEvent(copyDeleteSvg);
    editNoteEvent(copyEditSvg);

    copyName.textContent = noteName;

    fileList.appendChild(copyOfTarget);
  } catch (err) {
    console.error(err);
  };
}