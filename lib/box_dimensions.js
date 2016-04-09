"use strict";
/**
 * Created by kig on 4/9/16.
 */
class BoxDimensions {
  constructor(margin, padding, width, height) {
    this.marY             = margin    ||  20;
    this.marX             = margin    ||   0;
    this.padding          = padding   ||  15;
    this.width            = width     || 600;
    this.height           = height    || 160;

    this.boxBorderW       = 1;
    this.boxBorder        = `${this.boxBorderW}px solid #f0cc00`;
    this.boxShadow        = '0 0  5px #f0cc00';

    this.imageBorderW     = 1;
    this.imageBorder      = `${this.imageBorderW}px solid #888`;
    this.imageShadow      = '0 0   4px #444;';
    this.imageShadowHover = '0 0 10px  #00A2F0 !important';
  }

  get priceBoxWidth() {
    return Math.round(this.imageWidth/2);
  }

  get imageWidth() {
    return this.height - 2 * (this.padding + this.imageBorderW + this.boxBorderW);
  }

  get infoBoxWidth() {
    return this.width - this.imageWidth - this.priceBoxWidth - 5 * this.padding;
  }

  get infoTextWidth() {
    return this.width - this.imageWidth - 120 - 4 * this.padding;
  }
}

module.exports=BoxDimensions;

