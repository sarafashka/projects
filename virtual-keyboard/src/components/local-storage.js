function set(name, value) {
  window.localStorage.setItem(name, value);
}
function get(name, value) {
  if (window.localStorage.getItem(name, value)) {
    return window.localStorage.getItem(name, value);
  } return (name, value);
}
export { set, get };
