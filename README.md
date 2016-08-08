# ES7+ Bitcoin Price Tracker

Small React app, bundled with Webpack, written in ES7+ using `async/await` functions and the `XMLHttpRequest` replacement, `fetch`.

## Background

`fetch` returns a promise, so we can `await` the completion of a request in an `async` function. In addition, the methods on the returned response also return a promise, so we can `await` those as well.

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

- better state management
- perhaps get data in the top level then pass down as props
- we can then separate last updated and ticker components
- also would work better for setting the page title dynamically
- not related but making the text flash on updates would be nice
- find a source for data that updates more than once per minute
- get it to work in IE11 (the error messages are so cryptic)
