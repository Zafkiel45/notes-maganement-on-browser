const modal = document.querySelector('#editModal') as HTMLDivElement;
const inputEditor = document.querySelector('#editInput') as HTMLTextAreaElement;
const confirmBtn = document.querySelector('#editConfirm') as HTMLButtonElement;
const closeBtn = document.querySelector('#editClose') as HTMLButtonElement;
const editNoteBtn = document.querySelectorAll('.edit-note');
let noteId: number; 

window.onload = () => {
    editNoteBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');

            if(typeof id === 'undefined') {
                return;
            };
            
            editNote(Number(id));
        });
    });
};

export async function editNote(id: number) {
    toggleModal(true);
    console.log('CHAMADO')
    noteId = id;

    const note = await fetch(`http://localhost:3001/note/notes/${id}`);
    const noteContent = await note.text(); 

    inputEditor.value = noteContent;
};

confirmBtn.addEventListener('click', async () => {
    await fetch(`http://localhost:3001/note/notes/${noteId}`);
});

closeBtn.addEventListener('click', () => {
    toggleModal(false);
});


function toggleModal(state: boolean) {
    if(state) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    } else {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    };
};