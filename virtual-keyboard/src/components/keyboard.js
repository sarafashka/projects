/* eslint-disable import/extensions */
import { get, set } from './local-storage.js';
import add from './add.js';
import language from './lang-keyboard.js';
import Key from './key.js';

const main = add('main', 'main');
const title = add('h1', 'keyboard__title');
title.innerHTML = 'RSS Virtual Mac Keyboard';
const description = add('h3', 'keyboard__description');
description.innerHTML = 'If you want to change the input language use "control" + "left option"(for Win OS + "left alt")';
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
    this.textarea.setAttribute('placeholder', 'Please type something on keyboard');
    this.textarea.setAttribute('rows', '7');
    this.textarea.setAttribute('cols', '133');
    main.appendChild(this.textarea);

    this.containerKeyboard = add('div', 'keyboard');
    this.containerKeyboard.dataset.lang = langSelected;
    main.appendChild(this.containerKeyboard);
    document.body.prepend(main);
    return this;
  }

  render(langSelected) {
    this.selectedLayout = language[langSelected];
    if (this.containerKeyboard.firstChild) {
      while (this.containerKeyboard.firstChild) {
        this.containerKeyboard.removeChild(this.containerKeyboard.firstChild)
      }
    }
      
    this.keyButtons = [];
    this.layout.forEach((buttons) => {
      const keyboardRow = add('div', 'keyboard__row');
      this.containerKeyboard.appendChild(keyboardRow);
      buttons.forEach((button) => {
        const keyObj = this.selectedLayout.find((el) => el.code === button);
        if (keyObj) {
          const keyButton = new Key(keyObj);
          this.keyButtons.push(keyButton);
          keyboardRow.appendChild(keyButton.keyContainer);
        }
      });
    });
    document.addEventListener('keydown', this.pressButton);
    document.addEventListener('keyup', this.pressButton);
  }

  pressButton = (e) => {
    this.textarea.focus();

    const button = this.keyButtons.find((el) => el.code === e.code);


    if (e.type === 'keydown') {
       e.preventDefault();
       button.keyContainer.classList.add('press');

      if (e.code === 'ControlLeft') { 
        this.cntrPressed = true;
      }
      if (e.code === 'AltLeft') { 
        this.altPressed = true;
      }
    }

    if (e.type === 'keyup') {
      e.preventDefault();
      button.keyContainer.classList.remove('press');

      if (e.code === 'ControlLeft') { 
        this.cntrPressed = false;
      }
      if (e.code === 'AltLeft') { 
        this.altPressed = false;
      }
    }

    if (e.type === 'keydown') {
      if (e.code === 'ControlLeft' && this.altPressed) {
        this.changeLanguage();
      }
      if (e.code === 'AltLeft' && this.cntrPressed) {
        this.changeLanguage()
      }
    }
  }

  changeLanguage() {
    this.containerKeyboard.dataset.lang === 'ru' ? this.containerKeyboard.dataset.lang  = 'en' : this.containerKeyboard.dataset.lang  = 'ru';
    set('keyboardLang', this.containerKeyboard.dataset.lang);

    this.render(this.containerKeyboard.dataset.lang);
  }
}
