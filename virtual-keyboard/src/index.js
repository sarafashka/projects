/* eslint-disable import/extensions */
// import { get } from './components/local-storage.js';
import Keyboard from './components/keyboard.js';

const layout = [
  ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Enter'],
];
const langSelected = 'ru';
// langSelected = get('keyboardLang', 'lang');

new Keyboard(layout).init(langSelected).render();
