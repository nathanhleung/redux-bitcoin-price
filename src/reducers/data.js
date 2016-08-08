import { Map } from 'immutable';
import {
  GET_GDAX,
  GET_BITSTAMP,
  GET_KRAKEN,
} from '../constants/ActionTypes';
import {
  PENDING,
  ERROR,
  SUCCESS,
} from '../constants/AsyncStates';

function exchange(state = Map({
  isPending: false,
  price: 0,
  volume: 0,
  lastUpdated: 0,
}), action) {
  switch (action.meta.status) {
    case PENDING:
      return state.merge({
        isPending: true,
      });
    case ERROR:
      // @todo catch error action
      /*
      return state.merge({
        error: action.payload.error
      })
      */
    case SUCCESS:
      return state.merge({
        isPending: false,
        price: action.payload.price,
        volume: action.payload.volume,
        lastUpdated: (new Date()).getTime(),
      });
    default:
      return state;
  }
}

function data(state = Map(), action) {
  switch (action.type) {
    case GET_GDAX:
      return state.merge({
        gdax: exchange(state.get('gdax'), action),
      });
    case GET_BITSTAMP:
      return state.merge({
        bitstamp: exchange(state.get('bitstamp'), action),
      });
    case GET_KRAKEN:
      return state.merge({
        kraken: exchange(state.get('kraken'), action),
      });
    default:
      return state;
  }
}

export default data;