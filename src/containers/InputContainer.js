import { connect } from 'react-redux';
import { changeValue, setActive } from '../actions/form';
import average from '../utils/average';
import prettyNum from '../utils/prettyNum';
import Input from '../components/Input';

const mapStateToProps = (state, ownProps) => {
  const activeCurr = state.form.get('active');
  const baseCurr = state.form.get('base');
  // Make sure this is uppercase to match constant activeCurr
  const currency = ownProps.currency.toUpperCase();
  const active = (currency === activeCurr) ? true : false;
  if (active) {
    // remove commas
    // @todo find a utility which ignores commas
    // or one that automatically adds commas as one types
    const value = state.form.get(currency).replace(/,/g, '');
    return {
      active,
      value,
    };
  } else {
    // get BTC/USD rate
    let rate = average(ownProps.data);
    if (state.form.get('fiat') !== 'USD') {
      const fiat = state.form.get('fiat');
      // convert USD to current selected fiat currency
      rate *= state.forexData.get('rates').get(fiat);
    }
    // Only triggers if this is the inactive currency
    // If BTC is inactive, and BTC is the base (default),
    // we need to invert the rate before multiplying
    // by the number of USD
    if (baseCurr === currency) {
      rate **= -1;
    }
    const exchanged = state.form.get(activeCurr) * rate;
    let value = prettyNum(exchanged);
    if (isNaN(exchanged)) {
      value = '';
    }
    return {
      active,
      value,
    }
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: (e) => {
      const currency = ownProps.currency;
      dispatch(changeValue({
        currency,
        value: e.target.value,
      }));
      dispatch(setActive(currency));
    },
  };
};

const InputContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Input);

export default InputContainer;