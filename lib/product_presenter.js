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
    <style type="text/css">
      .product-photo-box:hover { 
        box-shadow: ${d.imageShadowHover}; 
      }
      .product-info a:hover, .product-info a h2:hover { 
        color: black !important; 
      }
    </style>
    <div  class="product-outer-box"  
          style="
            box-sizing: border-box;
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
          box-sizing: border-box; 
          width: auto;
          height: 40px; 
          float: right;
          padding: 0;
          margin: 0 0 0 ${d.padding}px;
          font-family: HelveticaNeue-CondensedBold, Helvetica, Arial, sans-serif;">
            ${p.priceFormatted}
       </h1>
        
      <div 
          class="product-photo-box"
          style="
            box-sizing: border-box;
            width: ${d.imageWidth}px;
            height: 100%;
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
          class="product-info"
          style="
            box-sizing: border-box;
            float: left;
            width: ${d.infoBoxWidth}px;
            height: 100%;
            padding: 0 0 0 ${d.padding}px;
            margin: 0;
          ">
          <a href="${p.url}" 
            style="text-decoration: none;">
            <h2 style="
                color: #777; 
                margin: 0 0 ${d.padding}px 0; 
                padding: 0; 
                font-family: HelveticaNeue-CondensedBold, Helvetica, Arial, sans-serif; 
                font-size: 16pt;">${p.name(90)}</h2>
          </a>
          <div style="width: ${d.infoTextWidth}px;">
          
            From the store <strong>
            <a href="${p.storeUrl}" style=" color: #00A2F0; text-decoration: none;"
                >${p.store}</a></strong>
            and saved <strong>
            <a href="${p.saversUrl}" style="color: #00A2F0; text-decoration: none;" 
                >${p.savesCount}</a></strong> times
            <br />
          
          </div> 
       </div>
        <a href="https://wanelo.com/" style="
          display: block;
          width: 120px;
          position: absolute;
          bottom: ${d.padding}px;
          right: ${d.padding}px;
        ">
          <img src="https://assets-fs.wnlimg.com/assets/logo120.png" style=" 
            margin-top: 15px; 
            width: 120px;"/>
       </a>              
     </div>                   
    `;

    return this[__html];
  }
}

module.exports = ProductPresenter;

