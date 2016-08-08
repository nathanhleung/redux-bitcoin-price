import { createAction } from 'redux-actions';
import { EDIT_BTC, EDIT_USD } from '../constants/ActionTypes';

export const editBtc = createAction(EDIT_BTC);
export const editUsd = createAction(EDIT_USD);