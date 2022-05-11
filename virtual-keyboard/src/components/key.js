/* eslint-disable import/extensions */
import add from './add.js';

export default class Key {
  constructor({
    low, upper, code, isFunction,
  }) {
    this.low = low;
    this.upper = upper;
    this.code = code;
    this.isFunction = isFunction;

    this.char = add('div', 'key__char');
    this.char.innerHTML = this.low;

    this.charUpperCase = add('div', 'key__char_upper-case');
    if (upper && this.low.toUpperCase() !== this.upper) {
      this.charUpperCase.innerHTML = this.upper;
    }

    this.keyContainer = add('div', 'key');
    this.keyContainer.appendChild(this.char);
    this.keyContainer.appendChild(this.charUpperCase);
    this.keyContainer.dataset.code = this.code;
    if (this.isFunction === true) {
      this.keyContainer.classList.add(this.code);
      this.keyContainer.classList.add('key__function');
    }
  }
}
