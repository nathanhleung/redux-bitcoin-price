import { connect } from 'react-redux';
import { BTC, USD } from '../constants/CurrencyCodes';
import average from '../utils/average';
import prettyNum from '../utils/prettyNum';
import { setBtc, setUsd, setActive } from '../actions/form';
import Form from '../components/Form';

const mapStateToProps = (state) => {
  return {
    active: state.form.get('active'),
    usd: state.form.get(USD),
    btc: state.form.get(BTC),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log(ownProps.data);
  return {
    onUsdChange: (e) => {
      dispatch(setUsd(e.target.value));
      const usd = Number(e.target.value.replace(/,/g, ''));
      const btc = prettyNum(usd / average(ownProps.data));
      dispatch(setBtc(btc));
      dispatch(setActive(USD));
    },
    onBtcChange: (e) => {
      dispatch(setBtc(e.target.value));
      const btc = Number(e.target.value.replace(/,/g, ''));
      const usd = prettyNum(average(ownProps.data) * btc);
      dispatch(setUsd(usd));
      dispatch(setActive(BTC));
    },
  };
};

const FormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);

export default FormContainer;
