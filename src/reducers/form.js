import { Map } from 'immutable';
import { EDIT_BTC, EDIT_USD } from '../constants/ActionTypes';
import { BTC, USD } from '../constants/CurrencyCodes';

function form(state = Map({
  btc: '1',
  usd: '1',
  active: BTC,
}), action) {
  switch (action.type) {
    case EDIT_BTC:
      return state.merge({
        active: BTC,
        btc: action.payload,
      });
    case EDIT_USD:
      return state.merge({
        active: USD,
        usd: action.payload,
      });
    default:
      return state;
  }
}

export default form;