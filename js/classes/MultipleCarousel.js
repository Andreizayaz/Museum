import { Carousel } from './Carousel.js';

export class MultipleCarousel extends Carousel {
  constructor(slidesSelector, countCarouselSlidesForMoving = 1, buttonsSelector, dotsSelector) {
    super();
    this.slides = document.querySelectorAll(`${slidesSelector}`);
    this.currentIndex = 0;
    this.countCarouselSlidesForMoving = countCarouselSlidesForMoving - 1;
    this.indexForShowNewSlide = this.countCarouselSlidesForMoving;
    this.isReverse = false;
  }

  changeIndexes(index) {
    this.currentIndex = this.getNewIndex(index, this.slides);
    this.indexForShowNewSlide = this.getNewIndex(index + this.countCarouselSlidesForMoving, this.slides);
  }

  hideItem(direction, activeClass) {
    if (this.countCarouselSlidesForMoving > 1 && this.isReverse) {
      const indexForDelete = this.indexForShowNewSlide;
      this.modifyCurrentItems(this.slides, direction, activeClass, indexForDelete);
      return;
    }
    const indexForDelete = this.currentIndex;
    this.modifyCurrentItems(this.slides, direction, activeClass, indexForDelete);
  }

  showItem(direction, activeClass, nextClass) {
    if (this.countCarouselSlidesForMoving > 1 && this.isReverse) {
      const indexForShow = this.currentIndex;
      this.deleteAndAddSelectedClasses(this.slides, direction, activeClass, nextClass, indexForShow);
      return;
    }

    if (this.countCarouselSlidesForMoving > 1 && !this.isReverse) {
      const indexForShow = this.indexForShowNewSlide;
      this.deleteAndAddSelectedClasses(this.slides, direction, activeClass, nextClass, indexForShow);
      return;
    }

    const indexForShow = this.currentIndex;
    this.deleteAndAddSelectedClasses(this.slides, direction, activeClass, nextClass, indexForShow);
  }

  showNextSlide(directionForHide, directionForShow, activeClass, nextClass) {
    this.isReverse = false;
    this.hideItem(directionForHide, activeClass);
    this.changeIndexes(this.currentIndex + 1);
    this.showItem(directionForShow, activeClass, nextClass);
  }

  showPreviousSlide(directionForHide, directionForShow, activeClass, nextClass) {
    this.isReverse = true;
    this.hideItem(directionForHide, activeClass);
    this.changeIndexes(this.currentIndex - 1);
    this.showItem(directionForShow, activeClass, nextClass);
  }

  changeSlideByDots(directionForHide, directionForShow, indexOfSelectedDot, activeClass, nextClass) {
    if (this.countCarouselSlidesForMoving > 1) {
      if (indexOfSelectedDot > this.currentIndex) {
        while (indexOfSelectedDot > this.currentIndex) {
          this.showNextSlide(directionForHide, directionForShow, activeClass, nextClass);
        }
      } else {
        while (indexOfSelectedDot < this.currentIndex) {
          this.showPreviousSlide(directionForHide, directionForShow, activeClass, nextClass);
        }
      }
    }
    this.hideItem(directionForHide, activeClass);
    this.changeIndexes(indexOfSelectedDot);
    this.showItem(directionForShow, activeClass, nextClass);
    return;
  }

  modifyCurrentItems(pseudoArray, direction, activeClass, indexForDelete) {
    Array.from(pseudoArray).forEach((item, index) => {
      if (item.classList.contains(activeClass)) {
        item.classList.add(direction);
        item.addEventListener('animationend', () => {
          item.classList.remove(direction);
          if (index === indexForDelete) {
            item.classList.remove(activeClass);
          }
        }, { once: true });
      }
    });
  }

  deleteAndAddSelectedClasses(pseudoArray, direction, activeClass, nextClass, indexForShow) {
    const that = this;
    this.slides[indexForShow].classList.add(nextClass, direction);
    this.slides.forEach((item, index) => that.setSlidesOrder(item, index, indexForShow));
    pseudoArray[indexForShow].addEventListener('animationend', ({ target }) => {
      target.classList.remove(`${nextClass}`, direction);
      target.classList.add(`${activeClass}`);
    }, { once: true });
  }

  getNewIndex(index, pseudoArray) {
    return (index + pseudoArray.length) % pseudoArray.length;
  }

  setSlidesOrder(item, index, compareIndex) {
    if (!this.isReverse) {
      this.isDirected(item, index, compareIndex);
      return;
    }
    this.isReversed(item, index, compareIndex);
  }

  isDirected(item, index, compareIndex) {
    switch (index) {
      case this.getNewIndex(compareIndex, this.slides):
        item.style.order = '3';
        break;
      case this.getNewIndex(compareIndex-1, this.slides):
        item.style.order = '2';
        break;
      case this.getNewIndex(compareIndex-2, this.slides):
        item.style.order = '1';
        break;
      case this.getNewIndex(compareIndex+2, this.slides):
        item.style.order = '0';
        break;
      case this.getNewIndex(compareIndex+1, this.slides):
        item.style.order = '4';
        break;
      default:
        item.style.order = '';
        break;
    }
  }

  isReversed(item, index, compareIndex) {
    switch (index) {
      case this.getNewIndex(compareIndex, this.slides):
        item.style.order = '0';
        break;
      case this.getNewIndex(compareIndex + 1, this.slides):
        item.style.order = '1';
        break;
      case this.getNewIndex(compareIndex + 2, this.slides):
        item.style.order = '2';
        break;
      case this.getNewIndex(compareIndex + 3, this.slides):
        item.style.order = '3';
        break;
      case this.getNewIndex(compareIndex + 4, this.slides):
        item.style.order = '4';
        break;
      default:
        item.style.order = '';
        break;
    }
  }
}
