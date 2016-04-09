"use strict";

const assert = require('assert');
const expect = require("chai").expect;

const describe = require("mocha/lib/mocha").describe;
const before = require("mocha/lib/mocha").before;
const it = require("mocha/lib/mocha.js").it;

const helper = new (require('../spec_helper'));
const ProductRetriever = require("../../lib/product_retriever");

describe('Product Retriever', function() {
  var fixture;
  let url = "https://wanelo.com/p/38126141/saucony-shadow-6000-suede-irish-coffee-pack-black-coffee";
  let shortUrl = "https://wanelo.com/p/38126141";

  before(function() {
    fixture = helper.loadFixture('./test/fixtures/wanelo_product.json');
  });

  it('can be instantiated', () => {
    var retriever = new ProductRetriever(url);
    expect(retriever.url).to.eql(url);
  });

  it('validates the URL', () => {
    var retriever = new ProductRetriever(url);
    expect(retriever.constructUrl()).to.eql(true);
    expect(retriever.productUrl).to.eql(shortUrl + '.json');
  });

  it('actually retrieves data', () => {
    var retriever = new ProductRetriever(url);
    expect(retriever.retrieveJSON()).to.eql(false);
    expect(retriever.constructUrl()).to.eql(true);
    expect(retriever.retrieveJSON()).to.eql(true);
    expect(retriever.result['code']).to.eql(200);
    expect(retriever.result['body']).to.match(/{"id":38126141,"name":"Saucony Shadow/)
  });

});
