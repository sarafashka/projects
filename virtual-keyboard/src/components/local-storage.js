/* eslint no-undef: "error" */
/* eslint-env browser */
function set(name, value) {
  window.localStorage.setItem(name, value);
}
function get(name, value) {
  return window.localStorage.getItem(name, value);
}
export { set, get };
