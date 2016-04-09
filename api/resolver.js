const request = require('request');
const Product = require('../lib/product');
const ProductPresenter = require('../lib/product_presenter');
const ProductRetriever = require('../lib/product_retriever');

module.exports = function(req, res) {
  res.NODE_DEBUG = true;
  var debug = req.query.debug;
  var url = req.query.url.trim();

  const retriever = new ProductRetriever(url);

  result = retriever.retrieve()


  // https://wanelo.com/p/38126141/s/2ZyLl-eiya-4leNN
  var matches = false;
  if (url)
    matches = url.match(/wanelo\.com\/p\/([a-zA-Z0-9]+)/);

  if (!matches) {
    res.status(400).send('Invalid URL format');
    return;
  }

  var productId = matches[1];
  var productJsonUrl = 'https://wanelo.com/p/' + encodeURIComponent(productId) + '.json';

  request(productJsonUrl, function(error, response, body) {
    var statusCode = response.statusCode;
    if (!error && response.statusCode == 200) {
      try {
        var product = new Product(body);
        return res.json({
          body: product.html()
        });
      } catch (ex) {
        statusCode = 500;
        error = 'Failed to parse JSON: ' + ex.message;
      }
    }

    res.status(response.statusCode).send('Error contacting wanelo, url was ' + productJsonUrl + ', and error is ' + error);
    return;
  });

};
