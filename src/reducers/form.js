import { Map } from 'immutable';
import {
  CHANGE_VALUE,
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
    case CHANGE_VALUE:
      return state.merge({
        [action.payload.currency]: action.payload.value,
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