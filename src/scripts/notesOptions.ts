import { toggleModal } from "./navbar/utils/utlity.navbar";

const modal = document.querySelector("#editModal") as HTMLDivElement;
const inputEditor = document.querySelector("#editInput") as HTMLTextAreaElement;
const confirmBtn = document.querySelector("#editConfirm") as HTMLButtonElement;
const closeBtn = document.querySelector("#editClose") as HTMLButtonElement;
const editNoteBtn = document.querySelectorAll(".edit-note");
const deleteBtns = document.querySelectorAll(".delete-note");

let noteId: number;

document.addEventListener("astro:page-load", () => {
  const editNoteBtn = document.querySelectorAll(".edit-note");
  const deleteBtns = document.querySelectorAll(".delete-note");
  const confirmBtn = document.querySelector("#editConfirm") as HTMLButtonElement;

  editNoteBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");

      if (typeof id === "undefined") {
        return;
      }

      editNote(Number(id));
    });
  });

  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      if (typeof id !== "string") return;
      deleteNote(id);
    });
  });

  confirmBtn.addEventListener("click", updateNote);
  closeBtn.addEventListener("click", () => {
    toggleModal(false, modal);
  });  
});

window.addEventListener("load", () => {
  editNoteBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");

      if (typeof id === "undefined") {
        return;
      }

      editNote(Number(id));
    });
  });

  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      if (typeof id !== "string") return;
      deleteNote(id);
    });
  });
});

export function deleteNoteEvent(element: HTMLElement | SVGElement) {
  element.addEventListener("click", () => {
    const id = element.getAttribute("data-id");
    if (typeof id !== "string") return;
    deleteNote(id);
  });
}
export function editNoteEvent(element: HTMLElement | SVGElement) {
  element.addEventListener("click", () => {
    const id = element.getAttribute("data-id");

    if (typeof id === "undefined") {
      return;
    }
    editNote(Number(id));
  });
}

async function deleteNote(id: string) {
  await fetch(`http://localhost:3001/note/notes/${id}`, {
    method: "DELETE",
    mode: "cors",
  });
  // The snippet below creates a reative operation on list.
  // Without this snippet of code, the data is updated on database, but
  // the client is not updated without refresh the whole page.
  const fileList = document.querySelector("#fileList") as HTMLUListElement;
  const fileArr = Array.from(fileList.children);

  for (let file of fileArr) {
    const elementId: string | null = file.getAttribute("data-id");

    if (elementId === null) {
      continue;
    } else if (elementId !== id) {
      continue;
    } else {
      file.remove();
    }
  }
}

async function editNote(id: number) {
  const modal = document.querySelector("#editModal") as HTMLDivElement;
  toggleModal(true, modal);
  noteId = id;

  const note = await fetch(`http://localhost:3001/note/notes/${id}`);
  const noteContent = await note.text();

  inputEditor.value = noteContent;
}

confirmBtn.addEventListener("click", updateNote);

async function updateNote() {
  try {
    await fetch(`http://localhost:3001/note/update`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: noteId, content: inputEditor.value }),
    });
  } catch (err) {
    console.error(err);
  }
}

closeBtn.addEventListener("click", () => {
  toggleModal(false, modal);
});
