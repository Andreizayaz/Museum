import { render, addClass } from '../helpers/functions.js';
import { doc } from '../helpers/variables.js';
import { ticketSectionImages } from '../data/initData.js';
import { CarouselTickets } from '../classes/CarouselTickets.js';

const ticketImagesContent = doc.querySelector('.tickets__carousel');
const subformBlock = doc.querySelector('.subform__number-input-options');
const subformInputs = Array.from(doc.querySelectorAll('.subform__number-input'));
const subformBtn = doc.querySelector('.subform__button');
const rippleElem = doc.querySelector('.simple-span');

render(ticketImagesContent, 'afterbegin', renderTicketsSlides, ticketSectionImages);

const ticketImagesCarousel = new CarouselTickets('.tickets__picture');

ticketImagesContent.addEventListener('mousedown', (e) => {
  ticketImagesCarousel.mousedownSwipeHandler(e);
  e.preventDefault();
}, false);

ticketImagesContent.addEventListener('mouseup', (e) => {
  ticketImagesCarousel.mouseupSwipeHandler(e);
  e.preventDefault();
}, false);

subformBlock.addEventListener('click', (e) => handleNumberInputClick(e));

subformBtn.addEventListener('click', () => {
  rippleElem.classList.add('ripple-effect');
  setTimeout(() => rippleElem.classList.remove('ripple-effect'), 1000);
});

function renderTicketsSlides(data) {
  const imagePath = 'assets/img/05_Tickets_section/Tickets_slider/';

  return data.map((item, index) => `<div class="tickets__picture ${addClass(index, 'content__slide_active')}"><img class="img" src=${imagePath + item.srcImage} alt="${item.title}"  title="${item.title}"></div>`).join('');
}

function handleNumberInputClick({ target }) {
  const basicUnderOr18 = subformInputs.find(item => item.name === 'basicUnderOr18');
  const seniorUnderOr65 = subformInputs.find(item => item.name === 'seniorUnderOr65');

  chooseNumberOptions(target, basicUnderOr18, seniorUnderOr65);
}

function chooseNumberOptions(option, basicUnderOr18, seniorUnderOr65) {
  const basicUnderOr18Value = Number(basicUnderOr18.value);
  const seniorUnderOr65Value = Number(seniorUnderOr65.value);

  switch (true) {
    case option.name === 'decrement-18' && basicUnderOr18Value > 0:
      basicUnderOr18.value = +basicUnderOr18.value - 1;
      break;
    case option.name === 'increment-18' && basicUnderOr18Value < 20:
      basicUnderOr18.value = +basicUnderOr18.value + 1;
      break;
    case option.name === 'decrement-65' && seniorUnderOr65Value > 0:
      seniorUnderOr65.value = +seniorUnderOr65.value - 1;
      break;
    case option.name === 'increment-65' && seniorUnderOr65Value < 20:
      seniorUnderOr65.value = +seniorUnderOr65.value + 1;
      break;
    default:
      break;
  }
}
