/* eslint-disable import/extensions */
import { set } from './local-storage.js';
import add from './add.js';
import language from './lang-keyboard.js';
import Key from './key.js';

const main = add('main', 'main');
const title = add('h1', 'keyboard__title');
title.innerHTML = 'RSS Virtual Mac Keyboard';
const description = add('div', 'keyboard__description');
description.innerHTML = `<p>If you want to change language press <span>  control + left option  </span>
<p>(for Win <span>  control + left alt  </span>)</p>
<p>There is no key "delete" on Mac keyboard, but if you want to try its functionality - use <span>  right option  </span></p>
<p>(for Win <span>  right alt  </span>)</p>`;
main.appendChild(title);

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
    this.textarea.setAttribute('cols', '131');
    main.appendChild(this.textarea);

    this.containerKeyboard = add('div', 'keyboard');
    this.containerKeyboard.dataset.lang = langSelected;
    main.appendChild(this.containerKeyboard);
    main.appendChild(description);
    document.body.prepend(main);
    return this;
  }

  render(langSelected) {
    this.selectedLayout = language[langSelected];
    if (this.containerKeyboard.firstChild) {
      while (this.containerKeyboard.firstChild) {
        this.containerKeyboard.removeChild(this.containerKeyboard.firstChild);
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
    this.containerKeyboard.addEventListener('mousedown', this.clickButton);
    this.containerKeyboard.addEventListener('mouseup', this.clickButton);
  }

  clickButton = (e) => {
    e.stopPropagation();
    const keyContainer = e.target.closest('.key');
    if (!keyContainer) return;
    keyContainer.addEventListener('mouseleave', this.cleanButton);
    const { code } = keyContainer.dataset;
    const button = { code, type: e.type };
    this.pressButton(button);
  };

  cleanButton = (e) => {
    e.target.classList.remove('press');
    e.target.removeEventListener('mouseleave', this.cleanButton);
  };

  pressButton = (e) => {
    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();

    this.textarea.focus();

    const button = this.keyButtons.find((el) => el.code === e.code);

    if (e.type === 'keydown' || e.type === 'mousedown') {
      button.keyContainer.classList.add('press');
      if (e.code === 'CapsLock') {
        this.isCaps = this.isCaps === false;
        this.UpperCase();
      }
      if (e.code === 'ControlLeft') {
        this.cntrPressed = true;
      }
      if (e.code === 'AltLeft') {
        this.altPressed = true;
      }
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
        this.shiftPressed = true;
        this.UpperCase();
      }

      if (e.type === 'keydown') {
        if (e.code === 'ControlLeft' && this.altPressed) {
          this.changeLanguage();
        }
        if (e.code === 'AltLeft' && this.cntrPressed) {
          this.changeLanguage();
        }
      }

      let symbol = button.low;
      if (this.shiftPressed && button.upper && button.low) {
        symbol = this.isCaps ? button.upper.toLowerCase() : button.upper;
      } else {
        symbol = this.isCaps ? button.low.toUpperCase() : button.low;
      }
      this.print(symbol, button);
    }

    if (e.type === 'keyup' || e.type === 'mouseup') {
      button.keyContainer.classList.remove('press');

      if (e.code === 'ControlLeft') {
        this.cntrPressed = false;
      }
      if (e.code === 'AltLeft') {
        this.altPressed = false;
      }
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
        this.shiftPressed = false;
        this.UpperCase();
      }
    }
  };

  UpperCase() {
    this.keyButtons.forEach((button) => {
      const newButton = button;
      if (this.isCaps && !this.shiftPressed) {
        if (button.low && button.low.toUpperCase() === button.upper) {
          newButton.char.innerHTML = button.low.toUpperCase();
        }
        if (button.code === 'CapsLock') {
          button.keyContainer.classList.add('uppercase');
        }
        if (button.code === 'ShiftLeft') {
          button.keyContainer.classList.remove('uppercase');
        }
        if (button.low && button.upper && button.upper === button.low.toUpperCase()) {
          newButton.charUpperCase.innerHTML = '';
        }
        if (button.low && button.upper && button.upper !== button.low.toUpperCase()) {
          newButton.char.innerHTML = button.low;
          newButton.charUpperCase.innerHTML = button.upper;
        }
      } else if (!this.isCaps && !this.shiftPressed) {
        if (button.low) {
          newButton.char.innerHTML = button.low;
        }
        if (button.code === 'CapsLock') {
          button.keyContainer.classList.remove('uppercase');
        }
        if (button.code === 'ShiftLeft') {
          button.keyContainer.classList.remove('uppercase');
        }
        if (button.low && button.upper && button.upper === button.low.toUpperCase()) {
          newButton.charUpperCase.innerHTML = '';
        }
        if (button.low && button.upper && button.upper !== button.low.toUpperCase()) {
          newButton.charUpperCase.innerHTML = button.upper;
        }
      } else if (!this.isCaps && this.shiftPressed) {
        if (button.low && button.upper && button.upper !== button.low.toUpperCase()) {
          newButton.char.innerHTML = button.upper;
          newButton.charUpperCase.innerHTML = button.low;
        }
        if (button.low && button.upper && button.upper === button.low.toUpperCase()) {
          newButton.char.innerHTML = button.upper;
        }
        if (button.code === 'ShiftLeft') {
          button.keyContainer.classList.add('uppercase');
        }
      } else if (this.isCaps && this.shiftPressed) {
        if (button.low) {
          newButton.char.innerHTML = button.low;
        }
        if (button.code === 'CapsLock') {
          button.keyContainer.classList.add('uppercase');
        }
        if (button.code === 'ShiftLeft') {
          button.keyContainer.classList.add('uppercase');
        }
        if (button.low && button.upper && button.upper !== button.low.toUpperCase()) {
          newButton.char.innerHTML = button.upper;
          newButton.charUpperCase.innerHTML = button.low;
        }
      }
    });
  }

  changeLanguage() {
    this.containerKeyboard.dataset.lang = this.containerKeyboard.dataset.lang === 'ru' ? 'en' : 'ru';
    set('keyboardLang', this.containerKeyboard.dataset.lang);

    this.render(this.containerKeyboard.dataset.lang);
    this.UpperCase();
  }

  print(symbol, button) {
    let cursor = this.textarea.selectionStart;
    const left = this.textarea.value.slice(0, cursor);
    const right = this.textarea.value.slice(cursor);

    if (!button.isFunction) {
      cursor += 1;
      this.textarea.value = `${left}${symbol}${right}`;
    } else if (button.code === 'Space') {
      this.textarea.value = `${left} ${right}`;
      cursor += 1;
    } else if (button.code === 'Enter') {
      this.textarea.value = `${left}\n${right}`;
      cursor += 1;
    } else if (button.code === 'Tab') {
      this.textarea.value = `${left}\t${right}`;
      cursor += 1;
    } else if (button.code === 'Backspace') {
      this.textarea.value = `${left.slice(0, -1)}${right}`;
    } else if (button.code === 'AltRight') {
      this.textarea.value = `${left}${right.slice(1)}`;
    } else if (button.code === 'ArrowRight') {
      cursor += 1;
    } else if (button.code === 'ArrowLeft') {
      cursor = cursor > 0 ? cursor - 1 : 0;
    } else if (button.code === 'ArrowUp') {
      cursor = this.textarea.value.slice(0, cursor).lastIndexOf('\n');
    } else if (button.code === 'ArrowDown') {
      cursor = this.textarea.value.indexOf('\n', cursor) + 1;
    }
    this.textarea.setSelectionRange(cursor, cursor);
  }
}
