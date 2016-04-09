"use strict";

const request = require('request');

const __productUrl = Symbol();
const __url = Symbol();
const __productId = Symbol();
const __code = Symbol();
const __body = Symbol();
const __error = Symbol();

const OK = true;
const ERR = false;

class ProductRetriever {
  constructor(productUrl) {
    this[__url] = productUrl;
    this[__productUrl] = null;
    this[__code] = 200;
    this[__body] = null;
    this[__error] = null;
  }

  retrieve() {
    this.constructUrl() && this.retrieveJSON();
    return this;
  }

  set error(value) {
    this[__error] = value;
  }

  get error() {
    return this[__error];
  }

  get url() {
    return this[__url];
  }

  get productUrl() {
    return this[__productUrl];
  }

  get result() {
    return { body: this[__body], error: this[__error], code: this[__code] };
  }

  constructUrl() {
    if (!this[__url]) {
      this.error = 'No URL provided';
      return ERR;
    }

    const matches = this[__url].match(/wanelo\.com\/p\/([a-zA-Z0-9]+)/);
    if (matches && matches[1]) {
      this[__productId] = matches[1];
      this[__productUrl] = `https://wanelo.com/p/${encodeURIComponent(this[__productId])}.json`;
    } else {
      this.error = `URL ${this.productUrl} does look like a Wanelo product URL`;
    }
    return OK;
  }

  retrieveJSON() {
    if (!this[__productUrl]) return ERR;

    request(this[__productUrl], (error, response, body) => {
      this[__code] = response.statusCode;
      this[__body] = body;
      if (response.statusCode != 200) {
        this[__error] = `Error contacting wanelo, url was ${this[__productUrl]}, and error received is ${error}`;
      }
    });

    return OK;
  }
}

module.exports = ProductRetriever;
