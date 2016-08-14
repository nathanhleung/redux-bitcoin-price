# Redux Bitcoin Price Tracker

<a href="https://david-dm.org/nathanhleung/redux-bitcoin-price">![deps](https://david-dm.org/nathanhleung/redux-bitcoin-price/status.svg)</a>
<a href="https://david-dm.org/nathanhleung/redux-bitcoin-price?type=dev">![devDeps](https://david-dm.org/nathanhleung/redux-bitcoin-price/dev-status.svg)</a>

Bitcoin price tracker built with [React](https://facebook.github.io/react/), [Redux](http://redux.js.org/), and [Webpack](https://webpack.github.io/), inspired by [Preev](http://preev.com/). Uses [Redux Thunk](https://github.com/gaearon/redux-thunk), [ES7 async/await](https://ponyfoo.com/articles/understanding-javascript-async-await), and [fetch](https://github.com/github/fetch) to get exchange data, then calculates a weighted average and updates once every 10 seconds (updates the title tag too!).

![screenshot](https://i.imgur.com/XMz6rHj.png)

## Stack

- [React](https://facebook.github.io/react/) view layer
- [Redux](http://redux.js.org/) state management
- [Redux Thunk](https://github.com/gaearon/redux-thunk) for async action creators
- [Redux Actions](https://github.com/acdlite/redux-actions) for creating [Flux Standard Actions](https://github.com/acdlite/flux-standard-action)
- [React Helmet](https://github.com/nfl/react-helmet) to update the title tag
- [Immutable.js](https://facebook.github.io/immutable-js/)
- Github's [fetch](https://github.com/github/fetch) polyfill for older browsers
- [Babel](https://babeljs.io/) w/ [stage-3](https://babeljs.io/docs/plugins/preset-stage-3/) preset for async/await
- [CSS Modules](https://github.com/css-modules/css-modules) so we can import and inline CSS
- [PostCSS](http://postcss.org/) with [Autoprefixer](https://github.com/postcss/autoprefixer) and [PreCSS](https://jonathantneal.github.io/precss/)
- [Webpack](https://webpack.github.io/) for module bundling

## Why fetch() and async/await?

`fetch` returns a promise, so we can `await` the completion of a request in an `async` functions!

```js
(async () => {
  // fetch data
  const response = await fetch('https://apiv2.bitcoinaverage.com/constants/exchangerates/global');
  // read response to json format
  const json = await response.json();
  // the API gives us the number of Bitcoins in 1 USD, but we want
  // the number of USD in 1 BTC, so we can use the ES7 exponentiation operator
  return json.rates.BTC.rate ** -1;
})();
```

## Todo
- Search for '@todo' in the code
- Making the text flash on updates would be nice
- Add stocks and other things to exchange! (AAPL etc)
- Use redux-actions `handleAction` in reducers
- Add an eslint config and more tests
- Wrap switch statements in blocks and make sure they break or return
- Better code coverage (write tests/cover fetch() fail)
