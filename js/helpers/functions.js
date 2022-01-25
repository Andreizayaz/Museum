export function render(elem, position, callback, data) {
  elem.insertAdjacentHTML(position, callback(data));
}

export function addClass(index, className) {
  return index === 0 ? className : '';
}

export function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

export function deleteActiveClass(data, currentItem, activeClassName) {
  const elemsArray = Array.from(data);
  elemsArray.find((item, index) => index !== currentItem
    && item.classList.contains(activeClassName))
    .classList.remove(activeClassName);
}
