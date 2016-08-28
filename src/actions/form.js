import { createAction } from 'redux-actions';
import {
  CHANGE_VALUE,
  SET_ACTIVE,
  CHANGE_FIAT,
} from '../constants/ActionTypes';

export const changeValue = createAction(CHANGE_VALUE);
export const setActive = createAction(SET_ACTIVE);

export const changeFiat = createAction(CHANGE_FIAT);