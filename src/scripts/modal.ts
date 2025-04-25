const modalError = document.querySelector("#modalError") as HTMLDivElement;
const modalSuccess = document.querySelector("#modalSuccess") as HTMLDivElement;
const modalSuccessMessage = document.querySelector("#modalSuccessMessage") as HTMLDivElement;
const modalErrorMessage = document.querySelector("#modalErrorMessage") as HTMLDivElement;

function toggleModal(state: boolean, element: HTMLDivElement) {
    if (state) {
        element.classList.remove("hidden");
        element.classList.add("flex");
				element.focus();
      } else {
        element.classList.remove("flex");
        element.classList.add("hidden");
      }
};

// ---------- FOLDER MODAL ---------- //

import { capitalizeFirstLetter } from "../utils/capitalizeFirstCharacter";

const folderModal = document.querySelector("#folderModal") as HTMLDivElement;
const folderModalCloseBtn = document.querySelector("#closeFolderModal") as HTMLButtonElement;
const folderNameInput = document.querySelector("#folderNameInput") as HTMLInputElement;
const folderCreateBtn = document.querySelector("#createFolderBtn") as HTMLButtonElement;
const folderOpenModalBtn = document.querySelector("#openFolderModal") as HTMLButtonElement;


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
        modalError.classList.add("hidden");
        modalError.classList.remove("flex");
      }, 3000);

      modalError.classList.remove("hidden");
      modalError.classList.add("flex");
      modalErrorMessage.textContent = "Nome da pasta vazia";
      return;
    }

    await fetch("http://localhost:3001/folders", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ folderName: folderName }),
    }).then((answer) => {
      if (answer.status === 409) {
        setTimeout(() => {
          modalError.classList.add("hidden");
          modalError.classList.remove("flex");
        }, 3000);

        modalError.classList.remove("hidden");
        modalError.classList.add("flex");
        modalErrorMessage.textContent = "Nome da Pasta já existe";

        return;
      } else if (answer.status === 400) {
        setTimeout(() => {
          modalError.classList.add("hidden");
          modalError.classList.remove("flex");
        }, 3000);

        modalError.classList.remove("hidden");
        modalError.classList.add("flex");
        modalErrorMessage.textContent = "Nome da pasta vazia!";
      } else {
        setTimeout(() => {
          modalSuccess.classList.add("hidden");
          modalSuccess.classList.remove("flex");
        }, 3000);

        modalSuccess.classList.remove("hidden");
        modalSuccess.classList.add("flex");
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

// ---------- CREATE MODAL ---------- //

const openModalBtn = document.querySelector("#openModal") as HTMLButtonElement;
const modal = document.querySelector("#modal") as HTMLDivElement;
const closeModalBtn = document.querySelector("#closeModal") as HTMLButtonElement;
const createNoteBtn = document.querySelector("#createNote") as HTMLButtonElement;

openModalBtn.addEventListener("click", () => {
  toggleModal(true, modal);
});

closeModalBtn.addEventListener("click", () => {
  toggleModal(false, modal);
});

createNoteBtn.addEventListener('click', async () => {
	const noteName = (document.querySelector('#noteName') as HTMLInputElement).value
	const selectedFolder = (document.querySelector('input[name="folder"]:checked') as HTMLInputElement).value; 
	const noteContent = (document.querySelector('#noteEditor') as HTMLTextAreaElement).value;

	await fetch('http://localhost:3001/note', {
			method: 'POST',
			mode: 'cors',
			body: JSON.stringify({
					name: noteName,
					content: noteContent,
					folder: parseInt(selectedFolder),
			}),
			headers: {
					"Content-Type": 'application/json',
			}
	}).then((res) => {
		console.log(res.status);
		console.log(res.statusText);
	})
});

// ---------- Keyboard Actions for modals ---------- //
window.addEventListener("load", () => {
  const modals = document.querySelectorAll(
    ".modals"
  ) as NodeListOf<HTMLDivElement>;
  modals.forEach((modal) => {
    modal.setAttribute("tabindex", "-1");

    modal.addEventListener("keydown", (e) => {
      if (e.key.toLowerCase() === "escape") {
        modal.classList.remove("flex");
        modal.classList.add("hidden");
      }
    });
  });
});
