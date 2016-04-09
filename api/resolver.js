const request = require('request');
const Product = require('../lib/product');
const sync = require('synchronize');
const _ = require('underscore');
const ProductPresenter = require('../lib/product_presenter');
const ProductRetriever = require('../lib/product_retriever');

module.exports = function(req, res) {

  if (!req.query.url) {
    return res.status(500).send('Can not resolve link without the "url" parameter.');
  }

  const url = req.query.url.trim();
  const preview = req.query.preview;

  const retriever = new ProductRetriever(url);

  result = retriever.retrieve((result) => {
    "use strict";
    if (result.completed && result.code == 200) {
      try {
        const presenter = new ProductPresenter(new Product(result.body));
        if (preview)  return res.status(200).send(presenter.html);
        else          return res.json({body: presenter.html});
      } catch (ex) {
        return res.status(result.code).send(result.error);
      }
    }
  });
}
