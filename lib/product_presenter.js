"use strict";
const Product = require('../lib/product');
const BoxDimensions = require('../lib/box_dimensions');

const __html = Symbol();

class ProductPresenter {
  /**
   * @return {null}
   */
  constructor(product, dimensions) {
    if (!product instanceof Product) return null;

    if (!dimensions || !dimensions instanceof BoxDimensions) {
      dimensions = new BoxDimensions(product);
    }

    this.dim = dimensions;
    this.product = product;
  }

  get html() {
    let d = this.dim;
    let h = this.dim.height;
    let w = this.dim.width;
    let p = this.product;

    if (!this[__html])
      this[__html] = `
    <style type="text/css">
      .wanelo-product-box a:hover, .wanelo-product-box a h2:hover {
        color: black !important;
      }
    </style>
    <div  class="wanelo-product-box"
          style="
            position: relative;
            width: ${w}px;
            height: ${h}px;
            border: ${d.boxBorder};
            box-shadow: ${d.boxShadow};
            padding: ${d.padding}px;
            margin: ${d.marY}px ${d.marX}px;
            font-family: HelveticaNeue-Light, Helvetica, Arial, sans-serif;
            font-size: 11pt;
            color: #555;
            background-color: #fafafa;">

      <h1 style="
          display: block;
          width: ${d.priceWidth}px;
          height: ${d.firstRowHeight}px;
          float: right;
          text-align: right;
          padding: 0;
          margin: 0;
          font-family: HelveticaNeue-CondensedBold, Helvetica, Arial, sans-serif;">
            ${p.priceFormatted}
       </h1>

      <div
          class="product-photo-box"
          style="
            width: ${d.imageWidth}px;
            padding: 0;
            margin: 0;
            float: left;
            width: ${d.imageWidth}px;
            height: ${d.imageWidth}px;
            border: ${d.imageBorder};
            box-shadow: ${d.imageShadow};
          ">
          <a href="${p.url}">
            <img style="margin: 0; padding: 0; width: 100%;"
              src="${p.image}"
              width="${d.imageWidth}"/>
          </a>
      </div>

      <div
          style="
            float: left;
            width: ${d.productNameWidth}px;
            height: ${d.firstRowHeight}px;
            padding: 0 0 0 ${d.padding * 2}px;
            margin: 0;
            overflow: hidden;
          ">
          <a href="${p.url}"
            style="text-decoration: none;">
            <h2 style="
                color: #777;
                margin: 0 0 ${d.padding}px 0;
                padding: 0;
                line-height: 18pt;
                font-family: HelveticaNeue-CondensedBold, Helvetica, Arial, sans-serif;
                font-size: 17pt;">${p.name(110)}</h2>
          </a>
       </div>

       <a href="https://wanelo.com/" style="
          display: block;
          width: ${d.logoWidth}px;
          height: ${d.logoHeight}px;
          float: right;
          text-align: right;
        ">
          <img src="https://assets-fs.wnlimg.com/assets/logo120.png" style="width: 120px; text-align: right;"/>
       </a>
       <div style="
          float: left;
          width: ${d.productInfoWidth}px;
          padding-left: ${2 * d.padding}px;
          margin: 0;
          line-height: 12pt;
          height: ${d.secondRowHeight}px;
          overflow: visible;
          ">Saved <strong>
          <a href="${p.saversUrl}" style="color: #00A2F0; text-decoration: none;"
              >${p.savesCount}</a></strong> times,
          from <strong>
          <a href="${p.storeUrl}" style=" color: #00A2F0; text-decoration: none;"
              >${p.store}</a></strong>

        </div>

     </div>
    `;

    return this[__html];
  }
}

module.exports = ProductPresenter;

