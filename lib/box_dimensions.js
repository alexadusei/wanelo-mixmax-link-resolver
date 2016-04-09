"use strict";

/**
 * Created by kig on 4/9/16.
 */
class BoxDimensions {
  constructor(margin, padding, width, height) {
    this.marY       = margin    ||  20;
    this.marX       = margin    ||   0;
    this.padding    = padding   ||  10;
    this.width      = width     || 600;
    this.height     = height    || 160;
  }

  get priceBoxWidth() {
    return this.imageWidth / 3;
  }

  get imageWidth() {
    return this.height - this.padding;
  }

  get infoBoxWidth() {
    return this.width - this.imageWidth - 4 * this.padding;
  }
}

module.exports=BoxDimensions;
