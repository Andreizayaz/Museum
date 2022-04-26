import { doc } from '../helpers/variables.js';
import { addZero } from '../helpers/functions.js';
import { Carousel } from './Carousel.js';

export class WelcomeCarousel extends Carousel {
  constructor(slidesSelector, currentSlideNumberSelector, dotsSelector) {
    super(slidesSelector, dotsSelector);
    this.currentSlideNumber = doc.querySelector(`${currentSlideNumberSelector}`);
  }

  changeCurrentSlideNumber() {
    const that = this;
    that.slides[that.currentItem].addEventListener('animationend', () => {
      that.currentSlideNumber.innerText = `${addZero(that.currentItem + 1)}`;
    }, { once: true });
  }

  changeSlideByInterval() {
    super.nextItem(this.currentItem);
    this.changeCurrentSlideNumber();
  }
}
