# Wanelo Link Preview for Mixmax

[![Build Status](https://travis-ci.org/kigster/wanelo-mixmax-link-resolver.svg?branch=master)](https://travis-ci.org/kigster/wanelo-mixmax-link-resolver)

This is an open source Mixmax Wanelo Link Resolver.

At the moment it only resolves product URLs, but in the future it can resolve also user
profiles, stores, and search URLs.

See <http://sdk.mixmax.com/docs/tutorial-giphy-link-preview> for more information about how to create link resolvers.

## Running locally

1. Install using `npm install`
2. Run using `npm start`

To simulate locally how Mixmax calls the resolver URL (to return HTML that goes into the email), pick any Wanelo
product URL, and run it as below:

```
curl http://localhost:9146/resolver?url=https://wanelo.com/p/38126141
```

## To run Mocha tests;

```bash
npm test
```

## Contributing

Bug reports and pull requests are welcome on GitHub at [https://github.com/kigster/wanelo-mixmax-link-resolver/issues](https://github.com/kigster/wanelo-mixmax-link-resolver/issues).

## Author

<p>&copy; 2016 Konstantin Gredeskoul, all rights reserved.</p>

Forked originally from the MixMax tutorial provided by

<p>&copy; 2015 MixMax, Inc. </p>

## License

This project is distributed under the [MIT License](https://raw.githubusercontent.com/kigster/wanelo-mixmax-link-resolver/master/LICENSE).

