import type { DivElement, InputElement, UListElement } from "../types/htmlElements";

// utility function to nav
export function toggleModal(state: boolean, element: DivElement) {
  if (state) {
    removeClass(element, 'hidden');
    addClass(element, 'flex');
    element.focus();
  } else {
    removeClass(element, 'flex');
    addClass(element, 'hidden');
  };
};

export function removeClass(target: HTMLElement, ...targetClass: string[]) {
  target.classList.remove(...targetClass);
};

export function addClass(target: HTMLElement, ...targetClass: string[]) {
  target.classList.add(...targetClass);
};

export async function deleteNode(node: HTMLElement | SVGElement) {
  node.addEventListener("click", async () => {
    const id = node.getAttribute("data-id");

    if (typeof id !== "string") return;

    const res = await fetch(`http://localhost:3001/note/notes/${id}`, {
      method: "DELETE",
      mode: "cors",
    });

    const fetchStatus = res.status;
    if(fetchStatus == 400 || fetchStatus === 500) return; 

    const fileList = document.querySelector("#fileList") as HTMLUListElement;
    const fileArr = Array.from(fileList.children);
  
    for (let file of fileArr) {
      const elementId: string | null = file.getAttribute("data-id");
  
      if (elementId === null) {continue}
      else if (elementId !== id) {continue}
      else {file.remove()};
    }
  });
};

export async function editNode(node: HTMLElement | SVGElement) {
  node.addEventListener("click", async () => {
    const id = node.getAttribute("data-id");

    if (typeof id === "undefined") {return}
    // FIX: Changes the #editInput to .editInput. Each input must have its own
    // state 
    const inputEditor = document.querySelector("#editInput") as HTMLTextAreaElement;
    const confirmBtn = document.querySelector("#editConfirm") as HTMLButtonElement;
    const modal = document.querySelector("#editModal") as HTMLDivElement;

    toggleModal(true, modal);
  
    const note = await fetch(`http://localhost:3001/note/notes/${id}`);
    const noteContent = await note.text();
  
    inputEditor.value = noteContent;

    confirmBtn.addEventListener("click", updateNote);
    
    async function updateNote() {
      try {
        await fetch(`http://localhost:3001/note/update`, {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id, content: inputEditor.value }),
        }).then(() => {confirmBtn.removeEventListener('click', updateNote)});
      } catch (err) {console.error(err)}
    }
  });
};