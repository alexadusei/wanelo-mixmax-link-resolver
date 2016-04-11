"use strict";

const resolver = require('../../api/resolver');
const assert = require('assert');
const helper = new (require('../spec_helper'));
const expect = require("chai").expect;

const describe = require("mocha/lib/mocha").describe;
const it = require("mocha/lib/mocha.js").it;
const Product = require("../../lib/product");

const BoxDimensions = require("../../lib/box_dimensions");
const ProductPresenter = require("../../lib/product_presenter");
var before = require("mocha/lib/mocha").before;

describe('Product Presenter', function() {
  var fixture;
  var product;
  var presenter;

  before(() => {
    fixture = helper.loadFixture('./test/fixtures/wanelo_product.json');
    product = new Product(fixture);
    presenter = new ProductPresenter(product);
  });

  describe('product HTML', () => {
    var html;
    
    it('should return HTML matching product name', function() {
      html = presenter.html;
      expect(html).to.match(/Saucony Shadow 6000 Suede \"Irish Coffee Pack\" - Black Coffee<\/h2>/);
    });
    it('should return HTML matching the formatted price', function() {
      expect(html).to.match(/\$120\.00/);
    });
    it('should return HTML matching store URL', function() {
      expect(html).to.match(/http:\/\/wanelo.com\/store\/jiberish/);
    });
    it('should return HTML with a product link', function() {
      expect(html).to.match(/<a href="http:\/\/wanelo.com\/p\/38126141\/saucony-shadow-6000-suede-irish-coffee-pack-black-coffee">/);
    });
  });


  describe('decimal digits', () => {
    it('should correctly calculate number of digits in a decimal number', () => {
      expect(BoxDimensions.decimalDigits(5)).to.eql(1);
      expect(BoxDimensions.decimalDigits(15)).to.eql(2);
      expect(BoxDimensions.decimalDigits(215)).to.eql(3);
      expect(BoxDimensions.decimalDigits(1234567890)).to.eql(10);
    })
  });

});
