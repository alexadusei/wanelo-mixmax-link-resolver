"use strict";
const sprintf = require("sprintf-js").sprintf;

class Product {

  constructor(jsonString) {
    this._json = JSON.parse(jsonString);
  }

  name() {
    return this._json.name;
  }

  url() {
    return this._json.object_url;
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
    <table style="border: 2px solid #f0cc00; padding: 10px; width: 600px; font-family: HelveticaNeue-Light, Helvetica, Arial, sans-serif; font-size: 11pt; color: #555; background-color: #f5f5f5;">
      <tr style="vertical-align: top; text-align: left;">
        <td width="180">
          <a href="${this.url()}"><img style="max-width:100%; border: 1px solid #29a2ff; box-shadow: 0 0 20px #202020;" src="${this.image()}" width="160"></a>
        </td>
        <td style="padding-left: 10px; padding-right: 10px;">
          <div style="float: right; margin: 0 0 50px 15px; height: 90px; "><h1 style="margin: 0; padding: 0; font-family: HelveticaNeue-CondensedBold, Helvetica, Arial, sans-serif;">${this.priceFormatted()}</h1></div>
          <h2 style="color: #666; margin: 0 0 15px 0; padding: 0; font-family: HelveticaNeue-CondensedBold, Helvetica, Arial, sans-serif; font-size: 16pt;">${this.name()}</h2>
          From the store <strong><a href="${this.storeUrl()}" style="color: #00A2F0; text-decoration: none;">${this.store()}</a></strong><br />
          <img style="margin-top: 20px;" src="https://assets-fs.wnlimg.com/assets/logo120.png"/>
        </td>
      </tr>
    </table>
    `;
  }
}

module.exports = Product;

