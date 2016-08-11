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
    return {
      active,
      value: state.form.get(currency),
    };
  } else {
    let rate = average(ownProps.data);
    // If currency isn't the base (BTC in this case)
    // then we invert the rate
    if (baseCurr !== currency) {
      rate **= -1;
    }
    return {
      active,
      value: prettyNum(state.form.get(active) * rate),
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