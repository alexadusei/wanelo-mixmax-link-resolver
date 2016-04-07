"use strict";
const sprintf = require("sprintf-js").sprintf;

class Product {

  constructor(jsonString) {
    this._json = JSON.parse(jsonString);
  }

  name(maxChars) {
    if (maxChars == undefined) maxChars = 80;
    var n = this._json.name;
    if (n.length > maxChars) {
      n = n.substring(0, maxChars) + '&hellip;'
    }
    return n;
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
    return this._json.price_cents / 100;
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
    <table style="border: 1px solid #f0cc00; box-shadow: 0 0 5px #f0cc00; padding: 10px; width: 590px; font-family: HelveticaNeue-Light, Helvetica, Arial, sans-serif; font-size: 11pt; color: #555; background-color: #fafafa;">
      <tr style="vertical-align: top; text-align: left;">
        <td width="150">
          <a href="${this.url()}"><img style="margin: 1px; width: 140px; border: 1px solid #888; box-shadow: 0 0 4px #444;" src="${this.image()}" width="140"></a>
        </td>
        <td style="padding-left: 10px; padding-right: 10px;">
          <div style="float: right; margin: 0 0 50px 10px; height: 90px; ">
            <h1 style="margin: 0; padding: 0; font-family: HelveticaNeue-CondensedBold, Helvetica, Arial, sans-serif;">${this.priceFormatted()}</h1>
          </div>
          <a href="${this.url()}" style="text-decoration: none;">
            <h2 style="color: #777; margin: 0 0 10px 0; padding: 0; font-family: HelveticaNeue-CondensedBold, Helvetica, Arial, sans-serif; font-size: 14pt;">${this.name()}</h2>
          </a>
          From the store <strong><a href="${this.storeUrl()}" style="color: #00A2F0; text-decoration: none;">${this.store()}</a></strong><br />
          <a href="https://wanelo.com/"><img style="margin-top: 15px; width: 100px;" src="https://assets-fs.wnlimg.com/assets/logo120.png"/></a>
        </td>
      </tr>
    </table>
    `;
  }
}

module.exports = Product;

