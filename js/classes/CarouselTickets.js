import { doc } from '../helpers/variables.js';

export class CarouselTickets {
  constructor(slidesSelector) {
    this.slides = doc.querySelectorAll(`${slidesSelector}`);
    this.currentItem = 0;
    this.intervalId = setInterval(() => {
      this.changeSlideByInterval();
    }, 3000);
  }

  changeCurrentItem(index) {
    this.currentItem = (index + this.slides.length) % this.slides.length;
  }

  hideItem(direction) {
    this.isEnabled = false;
    this.slides[this.currentItem].classList.add(direction);
    this.slides[this.currentItem].addEventListener('animationend', function () {
      this.classList.remove('content__slide_active', direction);
    }, { once: true });
  }

  showItem(direction) {
    this.slides[this.currentItem].classList.add('next', direction);
    this.slides[this.currentItem].addEventListener('animationend', function () {
      this.classList.remove('next', direction);
      this.classList.add('content__slide_active');
    }, { once: true });
  }

  nextItem(index) {
    this.hideItem('to-left');
    this.changeCurrentItem(index + 1);
    this.showItem('from-right');
  }

  previousItem(index) {
    this.hideItem('to-right');
    this.changeCurrentItem(index - 1);
    this.showItem('from-left');
  }

  changeSlideByInterval() {
    this.nextItem(this.currentItem);
  }
}
