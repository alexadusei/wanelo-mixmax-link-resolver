var key = require('../utils/key');
var sync = require('synchronize');
var request = require('request');
var _ = require('underscore');

module.exports = function(req, res) {
  res.NODE_DEBUG = true;
  var url = req.query.url.trim();
  // https://wanelo.com/p/38126141/s/2ZyLl-eiya-4leNN
  var matches = url.match(/wanelo\.com\/p\/([a-zA-Z0-9]+)/);
  if (!matches) {
    res.status(400).send('Invalid URL format');
    return;
  }

  var productId = matches[1];
  var productJsonUrl = 'https://wanelo.com/p/' + encodeURIComponent(productId) + '.json';
  var request = require('request');

  request(productJsonUrl, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var productJson = JSON.parse(response.body);
      var html =
        '<table style="border: 1px solid #f0cc00; padding: 10px; width: 500px; font-family: HelveticaNeue, Helvetica, Ariel, sans-serif; font-size: 10pt;">' +
          '<tr style="vertical-align: top; text-align: left;">' +
            '<td width="200"><img style="max-width:100%; border: 1px solid #29a2ff; box-shadow: 0 0 6px #202020;" src="' + productJson.images.x200 + '" width="200"/></td>' +
            '<td style="padding-left: 30px; padding-right: 30px;"><h2>' + productJson.name + '</h2>From <strong><a href="' + productJson.store.object_url + '">' + productJson.store.name + '</a></strong></td>' +
            '<td><h2>$' + (productJson.price_cents / 1000 ).toString() + '</h2></td>' +
          '</tr>' +
        '</table>';

      res.json({
        body: html
        // Add raw:true if you're returning content that you want the user to be able to edit
      });
    } else {
      res.status(response.statusCode).send('Error contacting wanelo, url was ' + productJsonUrl + ', and error is ' + error);
      return;
    }
  });
};
