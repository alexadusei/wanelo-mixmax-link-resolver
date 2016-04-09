"use strict";

const assert = require('assert');
const expect = require("chai").expect;

const describe = require("mocha/lib/mocha").describe;
const before = require("mocha/lib/mocha").before;
const it = require("mocha/lib/mocha.js").it;

const helper = new (require('../spec_helper'));
const ProductRetriever = require("../../lib/product_retriever");

describe('Product Retriever', function() {

  this.timeout(2000);

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
    expect(retriever.parse()).to.eql(true);
    expect(retriever.productUrl).to.eql(shortUrl + '.json');
  });

  describe('fetching the data', () => {
    it('sends off and processes HTTP request', (done) => {
      var retriever = new ProductRetriever(url);
      expect(retriever.retrieve((result) => {
        done();
        expect(result.code).to.eql(200);
        expect(result.body).to.match(/{"id":38126141,"name":"Saucony Shadow/)
      }));
    });
    it('can deal with invalid URLs', (done) => {
      var retriever = new ProductRetriever("https://wanelo.com/23094029384023984023894");
      expect(retriever.retrieve((result) => {
        expect(result.error).to.match(/not a valid Wanelo product URL/);
        done();
      }));
    });

    it('can deal with a 404', (done) => {
      var retriever = new ProductRetriever("https://wanelo.com/p/1123211212931391012");
      expect(retriever.retrieve((result) => {
        expect(result.code).to.eql(404);
        done();
      }));
    });
  });

});
