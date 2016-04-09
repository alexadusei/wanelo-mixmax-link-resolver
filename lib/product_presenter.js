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
      dimensions = new BoxDimensions();
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
    <div  class="product-outer-box"  
          style="
            box-sizing: border-box; 
            width: ${w}px; 
            height: ${h}px;         
            border: 1px solid #f0cc00; 
            box-shadow: 0 0 5px #f0cc00; 
            padding: ${d.padding}px;
            margin: ${d.marY}px ${d.marX}px;
            font-family: HelveticaNeue-Light, Helvetica, Arial, sans-serif; 
            font-size: 11pt; 
            color: #555; 
            background-color: #fafafa;">
      
      <div style="
        float: right; 
        box-sizing: border-box; 
        margin: 0 0 50px ${d.padding}px; 
        height: 100%; 
        ">
        <h1 style="
          margin: 0; 
          padding: 0; 
          font-family: HelveticaNeue-CondensedBold, Helvetica, Arial, sans-serif;">
            ${p.priceFormatted}
         </h1>
      </div>
            
      <div 
          class="product-photo-box"
          style="
            box-sizing: border-box;
            width: ${d.imageWidth}px;
            height: 100%;
            padding: 0;
            margin: 0;
            float: left;
          "> 
          <a href="${p.url}">
            <img style="
              margin: 1px; 
              width: ${d.imageWidth}px; 
              height: ${d.imageWidth}px; 
              border: 1px solid #888; 
              box-shadow: 0 0 4px #444;" 
              src="${p.image}" 
              width="${d.imageWidth}"/>            
          </a>
      </div>
   
      <div 
          class="product-info"
          style="
            box-sizing: border-box;
            float: left;
            width: ${d.infoBoxWidth}px;
            height: 100%;
            padding: 0 ${d.padding}px;
            margin: 0;
          ">
          <a href="${p.url}" 
            style="text-decoration: none;">
            <h2 style="
                color: #777; 
                margin: 0 0 ${d.padding}px 0; 
                padding: 0; 
                font-family: HelveticaNeue-CondensedBold, Helvetica, Arial, sans-serif; 
                font-size: 14pt;">${p.name(90)}</h2>
          </a>
          From the store <strong>
          <a href="${p.storeUrl}" style="
              color: #00A2F0; 
              text-decoration: none;
              ">${p.store}</a></strong>
          <br />
          <a href="https://wanelo.com/">
            <img src="https://assets-fs.wnlimg.com/assets/logo120.png" style=" 
              margin-top: 15px; 
              width: 100px;"/>
         </a>              
      </div>
     </div>                   
    `;

    return this[__html];
  }
}

module.exports = ProductPresenter;

