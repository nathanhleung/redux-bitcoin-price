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
  let rate = average(data);
  if (active === USD) {
    // invert rate
    rate **= -1;
  }
  const value = state.form.get(active) * rate;
  let title = `${prettyNum(value)} ${inactive}`;
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
  const forexData = state.forexData.get('rates').toObject();
  return {
    forexData,
    data,
    title, // set page title here
    lastUpdated,
  };
};

const AppContainer = connect(
  mapStateToProps
)(App);

export default AppContainer;