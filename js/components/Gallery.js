/* eslint-disable no-array-constructor */
import { renderDelayedContent } from '../helpers/functions.js';
import { doc } from '../helpers/variables.js';
import { gallerySectionData } from '../data/initData.js';

const galleryContainer = doc.querySelector('.gallery__inner-container');

renderDelayedContent(0.25, galleryContainer, 'afterbegin', renderGalleryImages, gallerySectionData);

function renderGalleryImages(data) {
  const path = 'assets/img/07_Gallery_section/';
  data.sort(() => Math.random() - 0.5);
  const count = Math.ceil(data.length / 3);
  const firstColumn = `<div class="inner-container__column">${data.slice(0, count).map(item => `<a class="inner-container__item"><img src=${path}${item.srcImage} alt=${item.title} alt=${item.title}></a>`).join('')}</div>`;
  const secondColumn = `<div class="inner-container__column">${data.slice(count, count * 2).map(item => `<a class="inner-container__item"><img src=${path}${item.srcImage} alt=${item.title} alt=${item.title}></a>`).join('')}</div>`;
  const thirdColumn = `<div class="inner-container__column">${data.slice(count * 2).map(item => `<a class="inner-container__item"><img src=${path}${item.srcImage} alt=${item.title} alt=${item.title}></a>`).join('')}</div>`;
  return new Array(firstColumn, secondColumn, thirdColumn).join('');
}
