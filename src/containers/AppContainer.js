import { connect } from 'react-redux';
import { BTC, USD } from '../constants/CurrencyCodes';
import average from '../utils/average';
import prettyNum from '../utils/prettyNum';
import App from '../components/App';

const mapStateToProps = (state) => {
  const active = state.form.get('active');
  const inactive = (active === BTC) ? USD : BTC;
  // convert to array so it can be processed by ../util/average.js
  // convert to objects for easier handling (dot property access, for one)
  const data = state.data.toArray().map(item => item.toObject());
  // @todo make a helper function to calculate BTC/FIAT rate
  let rate = average(data);
  if (state.form.get('fiat') !== 'USD') {
    const fiat = state.form.get('fiat');
    // convert USD to current selected fiat currency
    rate *= state.forexData.get('rates').get(fiat);
  }
  // don't hardcode this
  if (active !== BTC) {
    // invert rate
    rate **= -1;
  }
  const value = state.form.get(active) * rate;
  // @todo maybe fix bc theres more currencies
  // instead of BTC and USD being active and inactive
  // we need actually  currency names
  let inactiveCurrCode = inactive;
  if (state.form.get('fiat') !== USD && inactive === USD) {
    inactiveCurrCode = state.form.get('fiat');
  }
  let title = `${prettyNum(value)} ${inactiveCurrCode}`;
  // edge case on page load when it's NaN
  if (isNaN(value)) {
    title = 'React Bitcoin Price Ticker';
  }
  const lastUpdated = data.reduce((prev, curr) => {
    if (curr.lastUpdated > prev) {
      return curr.lastUpdated;
    }
    return prev;
  }, 0);
  return {
    data,
    title, // set page title here
    lastUpdated,
  };
};

const AppContainer = connect(
  mapStateToProps
)(App);

export default AppContainer;