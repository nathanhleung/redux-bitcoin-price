import { createAction } from 'redux-actions';
import { GET_FOREX_DATA } from '../constants/ActionTypes';
import {
  PENDING,
  ERROR,
  SUCCESS,
} from '../constants/AsyncStates';

export const requestForexData =
  createAction(GET_FOREX_DATA, undefined, () => ({ status: PENDING }));

export const receiveForexData =
  createAction(GET_FOREX_DATA, undefined, () => ({ status: SUCCESS }));
  
export const errorForexData =
  createAction(GET_FOREX_DATA, undefined, () => ({ status: ERROR }));
  
export function getForexData() {
  return async function(dispatch) {
    dispatch(requestForexData());
    const response = await fetch('https://api.fixer.io/latest?base=USD');
    const json = await response.json();
    dispatch(receiveForexData(json.rates));
  }
}