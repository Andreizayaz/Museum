export function render(elem, position, callback, data) {
  elem.insertAdjacentHTML(position, callback(data));
}

export function addClass(index, className, activeClassesCount) {
  if (activeClassesCount) {
    return index < activeClassesCount ? className : '';
  } else {
    return index === 0 ? className : '';
  }
}

export function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

export function deleteActiveClass(data, currentItem, activeClassName) {
  const elemsArray = Array.from(data);
  const itemForDeleteActiveClass = elemsArray.find((item, index) => index !== currentItem
    && item.classList.contains(activeClassName));
  if (itemForDeleteActiveClass) {
    itemForDeleteActiveClass.classList.remove(activeClassName);
  }
}

export function renderDelayedContent(threshold, elem, position, callback, data) {
  if ('IntersectionObserver' in window) {
    workWithObserver(threshold, elem, position, callback, data);
  } else {
    render(elem, position, callback, data);
  }
}

function workWithObserver(threshold, elem, position, callback, data) {
  const options = {
    threshold,
  };

  function onEntry(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        render(elem, position, callback, data);
        observer.unobserve(elem);
      }
    });
  }

  const observer = new IntersectionObserver(onEntry, options);

  observer.observe(elem);
}
