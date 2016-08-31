import { connect } from 'react-redux';
import { changeFiat } from '../actions/form';
import CurrencySelect from '../components/CurrencySelect';

const mapStateToProps = (state, ownProps) => {
  let currList;
  let value;
  if (ownProps.fiat) {
    currList = Object.keys(state.forexData.get('rates').toObject());
    value = state.form.get('fiat');
  } else {
    // get cryptos
    // default for now is BTC
    // currList is just BTC by default
    value = 'BTC';
  }
  return {
    currList,
    value,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  if (ownProps.fiat) {
    return {
      onChange: (selected) => {
        dispatch(changeFiat(selected.value));
      },
    };
  } else {
    return {
      onChange: () => {
        console.log('you changed the crypto!')
      },
    }
  }
}

const CurrencySelectContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencySelect);

export default CurrencySelectContainer;