import { Map } from 'immutable';
import {
  SET_BTC,
  SET_USD,
  SET_ACTIVE,
} from '../constants/ActionTypes';
import { BTC, USD } from '../constants/CurrencyCodes';

function form(state = Map({
  // ES6 computed properties
  [BTC]: '1',
  [USD]: '1',
  active: BTC,
  base: BTC,
}), action) {
  switch (action.type) {
    case SET_BTC:
      return state.merge({
        [BTC]: action.payload,
      });
    case SET_USD:
      return state.merge({
        [USD]: action.payload,
      });
    case SET_ACTIVE:
      return state.merge({
        active: action.payload,
      });
    default:
      return state;
  }
}

export default form;