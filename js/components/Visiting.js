import { render } from '../helpers/functions.js';
import { doc } from '../helpers/variables.js';
import { visitingSectionPicturesData } from '../data/initData.js';

const cardsContainer = doc.querySelector('.cards-container');

render(cardsContainer, 'afterbegin', renderVisitingCards, visitingSectionPicturesData.sort(() => 0.5 - Math.random()));

function renderVisitingCards(data) {
  const rootPage = 'tours/';
  const imagePath = 'assets/img/02_Visiting_section/';
  const commonData = {
    textTop: '360° Virtual Tour',
    textBottom: 'Google Street Panorama View',
  };

  return data.map(item => `<a href="${rootPage}${item.href}" class="cards-container__item item" target="_blank">
              <div class="item__image">
                <img src="${imagePath}${item.srcImage}" alt="${item.title}" title="${item.title}">
              </div>
              <h3 class="item__heading">
                ${item.title}
              </h3>
              <p class="item__description text">
                <span class="text__top">${commonData.textTop}</span>
                <span class="text__bottom">
                  ${commonData.textBottom}
                </span>
              </p>
            </a>`).join('');
}
