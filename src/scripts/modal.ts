const modalError = document.querySelector('#modalError') as HTMLDivElement;
const modalSuccess = document.querySelector('#modalSuccess') as HTMLDivElement;
const modalSuccessMessage = document.querySelector('#modalSuccessMessage') as HTMLDivElement;
const modalErrorMessage = document.querySelector('#modalErrorMessage') as HTMLDivElement;

// ---------- FOLDER MODAL ---------- // 

import { capitalizeFirstLetter } from "../utils/capitalizeFirstCharacter";

const folderModal = document.querySelector("#folderModal") as HTMLDivElement;
const folderModalCloseBtn = document.querySelector("#closeFolderModal") as HTMLButtonElement;
const folderNameInput = document.querySelector("#folderNameInput") as HTMLInputElement;
const folderCreateBtn = document.querySelector("#createFolderBtn") as HTMLButtonElement;
const folderOpenModalBtn = document.querySelector("#openFolderModal") as HTMLButtonElement;

let toggleFolderModal = (state: boolean) => {
    console.log('entry')
    if(state) {
        console.log('opened')
        folderModal.classList.remove('hidden');
        folderModal.classList.add('flex');
    } else {
        folderModal.classList.remove('flex');
        folderModal.classList.add('hidden');
    };
};

folderOpenModalBtn.addEventListener('click', () => {
    toggleFolderModal(true);
});

folderModalCloseBtn.addEventListener('click', () => {
    toggleFolderModal(false);
});

const createFolder = async () => {
    try {
        const folderName = capitalizeFirstLetter(folderNameInput.value);

        if(folderName === '') {

            setTimeout(() => {
                modalError.classList.add('hidden');
                modalError.classList.remove('flex');
            }, 3000);

            modalError.classList.remove('hidden');
            modalError.classList.add('flex');
            modalErrorMessage.textContent = 'Nome da pasta vazia'
            return; 
        };

        await fetch('http://localhost:3001/createfolder', {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({folderName: folderName}),
        }).then((answer) => {
            if(answer.status === 409) {

                setTimeout(() => {
                    modalError.classList.add('hidden');
                    modalError.classList.remove('flex');
                }, 3000);

                modalError.classList.remove('hidden');
                modalError.classList.add('flex');
                modalErrorMessage.textContent = 'Nome da Pasta já existe'

                return; 
            } else if(answer.status === 400) {
                setTimeout(() => {
                    modalError.classList.add('hidden');
                    modalError.classList.remove('flex');
                }, 3000);

                modalError.classList.remove('hidden');
                modalError.classList.add('flex');
                modalErrorMessage.textContent = 'Nome da pasta vazia!'
            } else {
                setTimeout(() => {
                    modalSuccess.classList.add('hidden');
                    modalSuccess.classList.remove('flex');
                }, 3000);

                modalSuccess.classList.remove('hidden');
                modalSuccess.classList.add('flex');
                modalSuccessMessage.textContent = 'Pasta criada com sucesso!';
            };
        });
    } catch(err) {
        console.error(err);
    };
};  

folderCreateBtn.addEventListener('click', async () => {
    await createFolder();
});
