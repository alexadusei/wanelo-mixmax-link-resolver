"use strict";
const sync = require('synchronize');

const request = require('request');

const __productUrl = Symbol();
const __url = Symbol();
const __productId = Symbol();
const __httpCode = Symbol();
const __body = Symbol();
const __error = Symbol();
const __finished = Symbol();

const OK = true;
const ERR = false;

class ProductRetriever {
  constructor(productUrl) {
    this[__url] = productUrl;
    this[__productUrl] = null;
    this[__httpCode] = 0;
    this[__body] = null;
    this[__error] = null;
    this[__finished] = false;
  }

  retrieve(callback, timeout) {
    this.parse();
    if (this[__error]) {
      callback(this.result);
      return ERR;
    }

    request({
      method: 'GET',
      uri: this.productUrl,
      timeout: timeout || 1000
    }, (error, response, body) => {
      if (!response) {
        this.error = `No response for ${this.productUrl}, and error received is ${error}`;
        return ERR;
      }
      this.finished = true;

      this[__httpCode] = response.statusCode;
      if (response.statusCode == 200) {
        this[__body] = body;
      } else {
        this.error = `Error contacting wanelo, url was ${this[__productUrl]}, and error received is ${error}`;
      }
      callback(this.result);
    });
    return OK;
  }

  parse() {
    if (!this[__url])        { this.error = 'No URL provided'; return ERR; }
    if ( this[__productUrl]) { return OK; }

    const matches = this[__url].match(/wanelo\.com\/p\/([a-zA-Z0-9]+)/);
    if (matches && matches[1]) {
      this[__productId] = matches[1];
      this[__productUrl] = `https://wanelo.com/p/${encodeURIComponent(this[__productId])}.json`;
      return OK;
    } else {
      this.error = `URL ${this.productUrl} does is a not a valid Wanelo product URL`;
      return ERR;
    }
  }

  get finished() {
    return this[__finished];
  }

  set finished(value) {
    this[__finished] = value ? true : false;
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
    return { completed: this.finished, body: this[__body], error: this[__error], code: this[__httpCode] };
  }

}

module.exports = ProductRetriever;
