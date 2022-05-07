export default function add(el, className) {
  let element = null;
  // eslint-disable-next-line no-undef
  element = document.createElement(el);
  element.classList.add(className);
  return element;
}
