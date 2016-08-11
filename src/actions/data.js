import { createAction } from 'redux-actions';
import { GET_DATA } from '../constants/ActionTypes';
import {
  PENDING,
  ERROR,
  SUCCESS,
} from '../constants/AsyncStates';
import {
  GDAX,
  BITSTAMP,
  KRAKEN,
} from '../constants/ExchangeNames';

export const requestData =
  createAction(GET_DATA, () => undefined, ({ exchange }) => ({
    exchange,
    status: PENDING,
  }));
export const receiveData = 
  createAction(GET_DATA, ({ data }) => ({
    price: data.price,
    volume: data.volume,
  }), ({ exchange }) => ({
    exchange,
    status: SUCCESS,
  }));
export const errorData =
  createAction(GET_DATA, () => undefined, ({ exchange }) => ({
    exchange,
    status: ERROR,
  }));
  
export function getData(exchange) {
  return async function(dispatch) {
    switch (exchange) {
      // each case should be wrapped in a try-catch
      // cases are wrapped in blocks to prevent duplicate decl errors
      case GDAX: {
        dispatch(requestData({ exchange }));
        const response = await fetch('https://api.gdax.com/products/BTC-USD/ticker');
        const json = await response.json();
        const data = {
          price: json.price,
          volume: json.volume,
        };
        dispatch(receiveData({
          exchange,
          data,
        }));
      }
      case BITSTAMP: {
        dispatch(requestData({ exchange }));
        const response = await fetch('https://www.bitstamp.net/api/v2/ticker/btcusd/');
        const json = await response.json();
        const data = {
          price: json.last,
          volume: json.volume,
        };
        dispatch(receiveData({
          exchange,
          data,
        }));
      }
      case KRAKEN: {
        dispatch(requestData({ exchange }));
        // to test around mess up the url so it throws an undefined error
        const response = await fetch('https://api.kraken.com/0/public/Ticker?pair=XBTUSD');
        const json = await response.json();
        const ticker = json.result.XXBTZUSD;
        // api docs here https://www.kraken.com/help/api#get-ticker-info
        const data = {
          price: ticker.c[0],
          volume: ticker.v[1],
        };
        dispatch(receiveData({
          exchange,
          data,
        }));
      }
      default: {
        // either do nothing or throw error
      }
    }
  }
}