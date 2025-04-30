import '../notesOptions';
import './modal/folderModal';
import './modal/noteModal';
import { attachClickEvents } from './modal/events/mouse.navbar';
import { attachKeyEvents }   from './modal/events/keyboard.navbar';

window.addEventListener('load', async () => {
  attachClickEvents();
  attachKeyEvents();
});
