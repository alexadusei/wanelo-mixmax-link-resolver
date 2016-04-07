# Wanelo Link Preview for Mixmax

This is an open source Mixmax Wanelo Link Resolver.

At the moment it only resolves product URLs, but in the future it can resolve also user
profiles, stores, and search URLs.

See <http://sdk.mixmax.com/docs/tutorial-giphy-link-preview> for more information about how to create link resolvers.

## Running locally

1. Install using `npm install`
2. Run using `npm start`

To simulate locally how Mixmax calls the resolver URL (to return HTML that goes into the email), run:

```
curl http://localhost:9146/resolver?url=https://wanelo.com/p/38126141
```

## To run all tests;

```bash
mocha
```
