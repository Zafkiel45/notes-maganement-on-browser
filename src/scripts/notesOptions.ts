import { deleteNode, editNode, toggleModal } from "./navbar/utils/utlity.navbar";

document.addEventListener("astro:page-load", () => {
  const modal = document.querySelector("#editModal") as HTMLDivElement;
  const closeBtn = document.querySelector("#editClose") as HTMLButtonElement;
  const editNoteBtn = document.querySelectorAll(".edit-note") as NodeListOf<SVGElement>;
  const deleteBtns = document.querySelectorAll(".delete-note") as NodeListOf<SVGElement>;;

  editNoteBtn.forEach((btn) => {editNode(btn)});
  deleteBtns.forEach((btn) => {deleteNode(btn)});
  closeBtn.addEventListener("click", () => {toggleModal(false, modal)});
});

