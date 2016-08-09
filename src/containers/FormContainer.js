import { connect } from 'react-redux';
import { BTC, USD } from '../constants/CurrencyCodes';
import average from '../utils/average';
import { editBtc, editUsd } from '../actions/form';
import Form from '../components/Form';

// makes sure .toString() doesn't return exponential notation etc
// also adds commas to big nums!
function prettyNum(num, sigfigs = 4) {
  function addCommas(numString) {
    let posFromEnd = 0;
    let commaString = '';
    while (posFromEnd < numString.length) {
      if (posFromEnd > 0 && posFromEnd % 3 === 0) {
        commaString += ','
      }
      commaString += numString[numString.length - posFromEnd - 1];
      posFromEnd++;
    }
    // We built the comma string backwards, so now we need to reverse it
    return commaString.split('').reverse().join('');
  }
  const absNum = Math.abs(num);
  if (absNum > 10000) {
    const digits = Math.ceil(Math.log10(num));
    const mantissa = num * Math.pow(10, -1 * (digits - 1));
    const fixedMantissa = mantissa.toPrecision(sigfigs).toString(10).replace('.', '');
    const newNum = fixedMantissa + '0'.repeat(digits - fixedMantissa.length);
    return addCommas(newNum);
  }
  if (absNum > 1000) {
    return addCommas(num.toPrecision(sigfigs).toString(10));
  }
  if (absNum < 1e-6 && absNum > 0) {
    const zeroes = -1 * Math.floor(Math.log10(num));
    console.log(zeroes);
    const mantissa = num * Math.pow(10, zeroes);
    const digits = mantissa.toPrecision(sigfigs).toString(10).replace('.', '');
    return '0.' + '0'.repeat(zeroes - 1) + digits;
  }
  return num.toPrecision(sigfigs).toString(10);
}

const mapStateToProps = (state, ownProps) => {
  switch (state.form.get('active')) {
    case USD: {
      // disregard the commas added by prettyNum
      // just a reminder to be careful, without /g, the regexp only
      // replaces the first instance
      const usd = Number(state.form.get(USD).replace(/,/g, ''));
      const btc = usd / average(ownProps.data);
      return {
        btc: prettyNum(btc),
        usd: state.form.get(USD),
      }
    }
    // btc is the default active currency
    case BTC:
    default: {
      const btc = Number(state.form.get(BTC).replace(/,/g, ''));
      const usd = average(ownProps.data) * btc;
      return {
        btc: state.form.get(BTC),
        usd: prettyNum(usd),
      };
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBtcChange: (e) => {
      dispatch(editBtc(e.target.value));
    },
    onUsdChange: (e) => {
      dispatch(editUsd(e.target.value));
    },
  };
};

const FormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);

export default FormContainer;
