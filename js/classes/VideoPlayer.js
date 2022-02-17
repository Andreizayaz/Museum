import { doc } from '../helpers/variables.js';

export class VideoPlayer {
  constructor(videoSelector) {
    this.video = doc.querySelector(`${videoSelector}`);
  }

  changeProgressBarColor(elem, fillGradientColor, blankGradientColor) {
    elem.style.background = `linear-gradient(to right, ${fillGradientColor} 0%, ${fillGradientColor} ${elem.value}%, ${blankGradientColor} ${elem.value}%, ${blankGradientColor} 100%)`;
  }
}
