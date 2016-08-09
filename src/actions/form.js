import { createAction } from 'redux-actions';
import { SET_BTC, SET_USD, SET_ACTIVE } from '../constants/ActionTypes';

export const setBtc = createAction(SET_BTC);
export const setUsd = createAction(SET_USD);
export const setActive = createAction(SET_ACTIVE);