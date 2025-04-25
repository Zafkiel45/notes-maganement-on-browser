const modal = document.querySelector("#editModal") as HTMLDivElement;
const inputEditor = document.querySelector("#editInput") as HTMLTextAreaElement;
const confirmBtn = document.querySelector("#editConfirm") as HTMLButtonElement;
const closeBtn = document.querySelector("#editClose") as HTMLButtonElement;
const editNoteBtn = document.querySelectorAll(".edit-note");
const deleteBtns = document.querySelectorAll(".delete-note");

let noteId: number;

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

async function deleteNote(id: string) {
  await fetch(`http://localhost:3001/note/notes/${id}`, {
    method: "DELETE",
    mode: "cors",
  });
}

async function editNote(id: number) {
  toggleModal(true);
  noteId = id;

  const note = await fetch(`http://localhost:3001/note/notes/${id}`);
  const noteContent = await note.text();

  inputEditor.value = noteContent;
}

confirmBtn.addEventListener("click", async () => {
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
});

closeBtn.addEventListener("click", () => {
  toggleModal(false);
});

function toggleModal(state: boolean) {
  if (state) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    modal.focus();
  } else {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}
