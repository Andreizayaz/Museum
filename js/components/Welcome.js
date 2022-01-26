import { render, addClass, addZero } from '../helpers/functions.js';
import { doc } from '../helpers/variables.js';
import { welcomeCarouselData } from '../data/initData.js';
import { WelcomeCarousel } from '../classes/WelcomeCarousel.js';

const welcomeCarouselContent = doc.querySelector('.slider__content');
const paginationNumbers = doc.querySelector('.pagination__numbers');
const paginationCarousel = doc.querySelector('.pagination__carousel');
const paginationArrows = doc.querySelector('.pagination__arrows');

render(welcomeCarouselContent, 'afterbegin', renderWelcomeSlides, welcomeCarouselData);
render(paginationNumbers, 'afterbegin', renderPaginationNumbers, welcomeCarouselData);
render(paginationCarousel, 'afterbegin', renderCarouselItems, welcomeCarouselData);

const welcomeCarousel = new WelcomeCarousel('.content__slide', '.numbers__current', '.carousel__item');

paginationArrows.addEventListener('click', (e) => handleClick(e));
paginationCarousel.addEventListener('click', (e) => handleClick(e));

function renderWelcomeSlides(data) {
  const imagePath = 'assets/img/08_Welcome_section/01_Welcome_slider/';

  return data.map((item, index) => `<div class="content__slide ${addClass(index, 'content__slide_active')}">
                <img src=${imagePath + item.srcImage} alt="${item.alt}"  title="${item.title}">
              </div>`).join('');
}

function renderCarouselItems(data) {
  return data.map((item, index) => `<button class="carousel__item ${addClass(index, 'carousel__item_active')}"></button>`).join('');
}

function renderPaginationNumbers(data) {
  if (data && data.length > 0) {
    return `<span class="numbers__current">01</span> <span class="numbers__total">${addZero(data.length)}</span>`;
  }
}

function handleClick({ target }) {
  let { className } = target;
  className = className.trim();
  switch (className) {
    case 'arrows__left':
      if (welcomeCarousel.isEnabled) {
        welcomeCarousel.previousItem(welcomeCarousel.currentItem);
        welcomeCarousel.changeClickAndClearInterval();
      }
      break;
    case 'arrows__right':
      if (welcomeCarousel.isEnabled) {
        welcomeCarousel.nextItem(welcomeCarousel.currentItem);
        welcomeCarousel.changeClickAndClearInterval();
      }
      break;
    case 'carousel__item':
      welcomeCarousel.changeSlide(paginationCarousel.children, target, 'carousel__item_active');
      welcomeCarousel.changeClickAndClearInterval();
      break;
    default:
      break;
  }
  welcomeCarousel.changeCurrentSlideNumber();
}
