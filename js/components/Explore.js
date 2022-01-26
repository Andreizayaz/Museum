import { render } from '../helpers/functions.js';
import { doc } from '../helpers/variables.js';
import { exploreSectionData } from '../data/initData.js';

const pictureDescription = doc.querySelector('.picture-description');
const picture = doc.querySelector('.picture');

render(pictureDescription, 'afterbegin', renderPictureDescriptionContent, exploreSectionData);

render(picture, 'afterbegin', renderPictureContent, exploreSectionData);

function renderPictureDescriptionContent(data) {
  return data[0].text.map(item => `<p class="picture-description__text">${item}</p>`).join('');
}

function renderPictureContent(data) {
  const imagePath = 'assets/img/03_Explore_section/explore_slider/';

  return `<img src="${imagePath}${data[0].srcImageBefore}" alt="explore image before"><img class="picture__none" src="${imagePath}${data[0].srcImageAfter}" alt="explore image after"><img class="picture__slider" src="assets/svg/05_Explore_section/01_explore_slider.svg" alt="slider">`;
}
