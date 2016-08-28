import { Map } from 'immutable';
import {
  CHANGE_VALUE,
  SET_ACTIVE,
  CHANGE_FIAT,
} from '../constants/ActionTypes';
import { BTC, USD } from '../constants/CurrencyCodes';

function form(state = Map({
  // ES6 computed properties
  [BTC]: '1',
  [USD]: '1',
  active: BTC,
  base: BTC,
  fiat: USD, // default base is USD
}), action) {
  switch (action.type) {
    case CHANGE_VALUE:
      return state.merge({
        [action.payload.currency]: action.payload.value,
      });
    case SET_ACTIVE:
      return state.merge({
        active: action.payload,
      });
    case CHANGE_FIAT:
      return state.merge({
        fiat: action.payload,
      });
    default:
      return state;
  }
}

export default form;