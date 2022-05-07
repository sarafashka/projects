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
    if (upper) {
      this.charUpperCase.innerHTML = this.upper;
    }

    this.key = add('div', 'key');
    this.key.appendChild(this.char);
    this.key.appendChild(this.charUpperCase);
    this.key.dataset.code = this.code;
  }
}
