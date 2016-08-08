import { createAction } from 'redux-actions';
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

export const requestGdax =
  createAction(GET_GDAX, undefined, () => ({ status: PENDING }));
export const requestBitstamp =
  createAction(GET_BITSTAMP, undefined, () => ({ status: PENDING }));
export const requestKraken =
  createAction(GET_KRAKEN, undefined, () => ({ status: PENDING }));
  
export const receiveGdax =
  createAction(GET_GDAX, undefined, () => ({ status: SUCCESS }));
export const receiveBitstamp =
  createAction(GET_BITSTAMP, undefined, () => ({ status: SUCCESS }));
export const receiveKraken =
  createAction(GET_KRAKEN, undefined, () => ({ status: SUCCESS }));
  
export const errorGdax =
  createAction(GET_GDAX, undefined, () => ({ status: ERROR }));
export const errorBitstamp =
  createAction(GET_BITSTAMP, undefined, () => ({ status: ERROR }));
export const errorKraken =
  createAction(GET_KRAKEN, undefined, () => ({ status: ERROR }));
  
export function getGdax() {
  // thunks can return promises, so we can make this an async function!
  return async function(dispatch) {
    dispatch(requestGdax());
    // this should be wrapped in a try-catch
    const response = await fetch('https://api.gdax.com/products/BTC-USD/ticker');
    const json = await response.json();
    dispatch(receiveGdax({ price: json.price, volume: json.volume }));
  };
};

export function getBitstamp() {
  return async function(dispatch) {
    dispatch(requestBitstamp());
    const response = await fetch('https://www.bitstamp.net/api/v2/ticker/btcusd/');
    const json = await response.json();
    dispatch(receiveBitstamp({ price: json.last, volume: json.volume }));
  }
};

export function getKraken() {
  return async function(dispatch) {
    try {
      dispatch(requestKraken());
      // to test around mess up the url so it throws an undefined error
      const response = await fetch('https://api.kraken.com/0/public/Ticker?pair=XBTUSD');
      const json = await response.json();
      const ticker = json.result.XXBTZUSD;
      // api docs here https://www.kraken.com/help/api#get-ticker-info
      dispatch(receiveKraken({ price: ticker.c[0], volume: ticker.v[1] }));
    } catch (e) {
      // need to catch this in reducers/data.js
      dispatch(errorKraken(e))
      throw e;
    }
  }
}

export function getData() {
  return async function(dispatch) {
    dispatch(getGdax());
    dispatch(getBitstamp());
    dispatch(getKraken());
  }
}
