import { connect } from 'react-redux';
import { BTC, USD } from '../constants/CurrencyCodes';
import average from '../utils/average';
import { editBtc, editUsd } from '../actions/form';
import Form from '../components/Form';

const mapStateToProps = (state, ownProps) => {
  switch (state.form.get('active')) {
    case USD:
      return {
        // We want to keep the form properties strings for consistency
        btc: (Number(state.form.get('usd')) / average(ownProps.data)).toString(10),
        usd: state.form.get('usd'),
      }
    case BTC:
    default: // btc is the default active currency
      return {
        btc: state.form.get('btc'),
        usd: (average(ownProps.data) * Number(state.form.get('btc'))).toString(10),
      };
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
