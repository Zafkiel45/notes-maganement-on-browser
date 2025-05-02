import type { DivElement, UListElement } from "../types/htmlElements";

const folderList  = document.querySelector('#navbar-folders') as UListElement;

export function createFolderNode(name: string) {
  try {
    const lastChild = folderList.lastElementChild;

    if(typeof lastChild === 'undefined' || lastChild === null) {
      window.location.reload();
      return;
    };

    const lastChildCopy = lastChild.cloneNode(true) as HTMLElement;
    const currentHref = lastChildCopy.getAttribute('href')?.split('/');
    const folderName = lastChildCopy.querySelector('.folder-name') as DivElement;
    
    lastChildCopy.removeAttribute('href');
    lastChildCopy.setAttribute('href', `/folder/${currentHref}/fileTypes`);
    folderName.textContent = name;

    folderList.appendChild(lastChildCopy);
    return; 
  } catch(err) {
    console.error(err);
  };
};