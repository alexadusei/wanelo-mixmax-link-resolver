"use strict";
const sprintf = require("sprintf-js").sprintf;

class Product {

  constructor(jsonString) {
    this._json = JSON.parse(jsonString);
  }

  name() {
    return this._json.name;
  }

  store() {
    return this._json.store.name;
  }

  storeUrl() {
    return this._json.store.object_url;
  }

  price() {
    return this._json.price_cents / 1000;
  }

  priceFormatted() {
    return sprintf("%s%.2f", this.currency(), this.price());
  }

  image() {
    return this._json.images.x200;
  }

  currency() {
    if (this._currencies == undefined) {
      this._currencies = {
        "USD": "$",
        "GBP": "£",
        "YEN": "¥",
        "EUR": "€"
      };
    }
    return this._currencies[this._json.currency] || '$';
  }

  html() {
    return `
    <table style="border: 2px solid #f0cc00; padding: 10px; width: 500px; font-family: HelveticaNeue, Helvetica, Arial, sans-serif; font-size: 10pt;">
      <tr style="vertical-align: top; text-align: left;">
        <td width="200"><img style="max-width:100%; border: 1px solid #29a2ff; box-shadow: 0 0 10px #202020;" src="${this.image()}" width="200"/></td>
        <td style="padding-left: 30px; padding-right: 30px;">
          <h2 style="font-family: HelveticaNeue-CondensedBold, Helvetica, Arial, sans-serif;">${this.name()}</h2>
          From the store <strong><a href="${this.storeUrl()}">${this.store()}</a></strong></td>
        <td><h2>${this.priceFormatted()}</h2></td>
      </tr>
    </table>  
    `;
  }
}

module.exports = Product;

