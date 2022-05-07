/* eslint-disable no-undef */
/* eslint-disable import/extensions */
// import { get, set } from './local-storage.js';
import add from './add.js';
import language from './lang-keyboard.js';
import Key from './key.js';

const main = add('main', 'main');
const title = add('h1', 'keyboard__title');
title.innerHTML = 'RSS Virtual Mac Keyboard';
const description = add('h3', 'keyboard__description');
description.innerHTML = 'If you want to change layout use "Command" + "Space"';
main.appendChild(title);
main.appendChild(description);

export default class Keyboard {
  constructor(layout) {
    this.layout = layout;
    this.isCaps = false;
    this.keyPressed = {};
  }

  init(langSelected) {
    this.textarea = add('textarea', 'keyboard__text');
    main.appendChild(this.textarea);

    this.selectedLayout = language[langSelected];
    this.containerKeyboard = add('div', 'keyboard');
    this.containerKeyboard.dataset.lang = langSelected;
    main.appendChild(this.containerKeyboard);
    document.body.prepend(main);
    return this;
  }

  render() {
    this.keyButtons = [];
    this.layout.forEach((buttons) => {
      const keyboardRow = add('div', 'keyboard__row');
      this.containerKeyboard.appendChild(keyboardRow);
      // keyboardRow.dataset.row = i + 1;
      buttons.forEach((button) => {
        const keyObj = this.selectedLayout.find((key) => key.code === button);
        if (keyObj) {
          const keyButton = new Key(keyObj);
          this.keyButtons.push(keyButton);
          keyboardRow.appendChild(keyButton.key);
        }
      });
    });
  }
}
