import { createAction } from 'redux-actions';
import {
  CHANGE_VALUE,
  SET_ACTIVE,
} from '../constants/ActionTypes';

export const changeValue = createAction(CHANGE_VALUE);
export const setActive = createAction(SET_ACTIVE);