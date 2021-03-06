import { doc } from '../helpers/variables.js';
import { deleteActiveClass } from '../helpers/functions.js';

export class Carousel {
  constructor(slidesSelector, dotsSelector) {
    this.slides = doc.querySelectorAll(`${slidesSelector}`);
    this.dots = doc.querySelectorAll(`${dotsSelector}`);
    this.currentItem = 0;
    this.isEnabled = true;
    this.intervalId = setInterval(() => {
      this.changeSlideByInterval();
    }, 3000);
    this.isClicked = false;
    this.isSwiped = false;
  }

  changeCurrentItem(index) {
    this.currentItem = (index + this.slides.length) % this.slides.length;
  }

  hideItem(direction) {
    const that = this;
    this.isEnabled = false;
    this.slides[this.currentItem].classList.add(direction);
    this.slides[this.currentItem].addEventListener('animationend', function () {
      this.classList.remove('content__slide_active', direction);
      deleteActiveClass(that.dots, that.currentItem, 'carousel__item_active');
    }, { once: true });
  }

  showItem(direction) {
    const that = this;
    this.slides[this.currentItem].classList.add('next', direction);
    this.slides[this.currentItem].addEventListener('animationend', function () {
      this.classList.remove('next', direction);
      this.classList.add('content__slide_active');
      that.dots[that.currentItem].classList.add('carousel__item_active');
      that.isEnabled = true;
      if (that.isClicked || that.isSwiped) {
        that.intervalId = setInterval(() => {
          that.changeSlideByInterval();
        }, 3000);

        if (that.isClicked) {
          that.isClicked = false;
        }

        if (that.isSwiped) {
          that.isSwiped = false;
        }
      }
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

  changeSlide(slidesList, selectedItem, activeClassName) {
    const elemsArray = Array.from(slidesList);
    const selectedItemIndex = elemsArray.indexOf(selectedItem);
    const currentActiveItem = elemsArray.find(item => item.classList.contains(activeClassName));
    const currentActiveItemIndex = elemsArray.indexOf(currentActiveItem);

    if (selectedItemIndex === currentActiveItemIndex) {
      return;
    }

    switch (true) {
      case selectedItemIndex > currentActiveItemIndex:
        this.hideItem('to-left');
        this.changeCurrentItem(selectedItemIndex);
        this.showItem('from-right');
        break;
      case selectedItemIndex < currentActiveItemIndex:
        this.hideItem('to-right');
        this.changeCurrentItem(selectedItemIndex);
        this.showItem('from-left');
        break;
      default:
        break;
    }
  }

  /* changeSlideByInterval() {
    this.nextItem(this.currentItem);
    this.changeCurrentSlideNumber();
    console.log(this.intervalId);
  } */

  changeSlideByInterval() {
    this.nextItem(this.currentItem);
  }

  changeClickAndClearInterval() {
    this.isClicked = true;
    clearInterval(this.intervalId);
  }

  changeSwipeAndClearInterval() {
    this.isSwiped = true;
    clearInterval(this.intervalId);
  }

  mousedownSwipeHandler(e) {
    this.startX = e.pageX;
    this.startY = e.pageY;
    this.startTime = new Date().getTime();
    e.target.style.cursor = 'grabbing';
  }

  mouseupSwipeHandler(e) {
    const threshold = 150;
    const restraint = 100;
    const allowedTime = 1000;
    e.target.style.cursor = 'grab';

    const distX = e.pageX - this.startX;
    const distY = e.pageY - this.startY;
    const elapsedTime = new Date().getTime() - this.startTime;
    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        if (distX > 0) {
          if (this.isEnabled) {
            this.previousItem(this.currentItem);
            this.changeSwipeAndClearInterval();
          }
        } else {
          if (this.isEnabled) {
            this.nextItem(this.currentItem);
            this.changeSwipeAndClearInterval();
          }
        }
      }
    }
  }
}
