import { doc, fillGradientColor, blankGradientColor } from '../helpers/variables.js';
import { render, addClass } from '../helpers/functions.js';
import { videoSectionData } from '../data/initData.js';
import { VideoPlayer } from '../classes/VideoPlayer.js';
import { MultipleCarousel } from '../classes/MultipleCarousel.js';

const videoPlayer = new VideoPlayer('.video__frame');


const videoControls = doc.querySelector('.frame__toolbar');
const videoList = doc.querySelector('.video-list');
const videoPagination = doc.querySelector('.video-pagination');

render(videoList, 'afterbegin', renderVideoList, videoSectionData);
render(videoPagination, 'afterbegin', renderPaginationList, videoSectionData);

const paginationCarousel = doc.querySelector('.video-pagination__video-carousel');
const paginationArrows = doc.querySelectorAll('.video-pagination__button');
const videoCarousel = new MultipleCarousel('.video-list', 3, '.video-pagination__button', '.video-pagination__video-carousel');

videoControls.addEventListener('input', (e) => inputHandler(e));

function renderVideoList(data) {
  return data.map((item, index) => `<div class="video-list__item ${addClass(index, 'video-list__item_active', 3)}"><iframe class="video-list__frame" src="${item.href}" title="${item.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`).join('');
}

function renderPaginationList(data) {
  if (!data || data.length === 0) {
    return;
  }
  return `<button class="video-pagination__previous video-pagination__button" title="previous"></button><div class="video-pagination__video-carousel video-carousel">${data.map((item, index) => `<button class="video-carousel__item ${addClass(index, 'video-carousel__item_active')}"></button>`).join('')}</div><button class="video-pagination__next video-pagination__button" title="next"></button>`;
}

function inputHandler({ target }) {
  const { className } = target;
  switch (className) {
    case 'frame__video-progress-range':
      videoPlayer.changeProgressBarColor(target, fillGradientColor, blankGradientColor);
      break;
    case 'frame__volume-progress-range':
      videoPlayer.changeProgressBarColor(target, fillGradientColor, blankGradientColor);
      break;
    default:
      break;
  }
}
