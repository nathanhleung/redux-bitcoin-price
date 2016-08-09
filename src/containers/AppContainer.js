import { connect } from 'react-redux';
import { BTC, USD } from '../constants/CurrencyCodes';
import App from '../components/App';

const mapStateToProps = (state) => {
  let inactive;
  if (state.form.get('active') === BTC) {
    inactive = USD;
  } else {
    inactive = BTC;
  }
  return {
    // convert to array so it can be processed by ../util/average.js
    // convert to objects for easier handling (dot property access, for one)
    data: state.data.toArray().map(item => item.toObject()),
    currentVal: state.form.get(inactive), // set page title here
  };
};

const AppContainer = connect(
  mapStateToProps
)(App);

export default AppContainer;