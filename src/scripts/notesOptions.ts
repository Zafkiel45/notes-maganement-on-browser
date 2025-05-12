import { deleteNode, editNode, toggleModal } from "./navbar/utils/utlity.navbar";

document.addEventListener("astro:page-load", () => {
  const modal = document.querySelector("#editModal") as HTMLDivElement;
  const closeBtn = document.querySelector("#editClose") as HTMLButtonElement;
  const editNoteBtn = document.querySelectorAll(".edit-note") as NodeListOf<SVGElement>;
  const deleteBtns = document.querySelectorAll(".delete-note") as NodeListOf<SVGElement>;
  const confirmBtn = document.querySelector(".btn-edit-confirm") as HTMLButtonElement;
  const inputEditor = modal.querySelector(".input-edit") as HTMLTextAreaElement;

  editNoteBtn.forEach((btn) => {editNode(btn, modal, inputEditor)});
  deleteBtns.forEach((btn) => {deleteNode(btn)});
  closeBtn.addEventListener("click", () => {toggleModal(false, modal)});
  confirmBtn.addEventListener("click", updateNote);
  
  async function updateNote() {
    const id = modal.getAttribute('data-note-id');

    try {
      await fetch(`http://localhost:3001/note/update`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, content: inputEditor.value }),
      }).then(() => {
        inputEditor.value = '';
      });
    } catch (err) {
      console.error(err);
    }
}

});

