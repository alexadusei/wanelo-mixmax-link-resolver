"use strict";
/**
 * Created by kig on 4/9/16.
 */
class BoxDimensions {
  constructor(product, width, height, margin, padding, border) {

    this.product          = product;

    this.marY             = margin    ||  10;
    this.marX             = 0;
    this.padding          = padding   ||  10;
    this.border           = border    ||   1;

    // border-box model does not work in email :(
    this.width            = (width    || 576) - 2 * this.padding - 2 * this.border;
    this.height           = (height   || 130) - 2 * this.padding - 2 * this.border;

    this.boxBorder        = `${this.border}px solid #f0cc00`;
    this.boxShadow        = '0 0  5px #f0cc00';

    this.imageBorder      = `${this.border}px solid #888`;
    this.imageShadow      = '0 0   4px #444;';
  }

  get firstRowHeight() {
    return this.height - 21; // 21 is the height of the  logo we are pushing down.
  }

  get priceWidth() {
    // additional 3 is for dot and two decimal points
    return Math.max(... [100, (BoxDimensions.decimalDigits(this.product.price) + 3) * 16]);


  }

  get imageWidth() {
    return this.height - 2;
  }

  get productNameWidth() {
    return this.width - this.imageWidth - this.priceWidth - 4 * this.padding;
  }

  get productInfoWidth() {
    return this.width - this.imageWidth - this.logoWidth - 4 * this.padding;
  }


  static decimalDigits(value) {
    return Math.floor(Math.log10(Math.abs(value))) + 1;
  }
}

module.exports=BoxDimensions;

