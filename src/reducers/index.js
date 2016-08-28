import { combineReducers } from 'redux';
import form from './form';
import data from './data';
import forexData from './forexData';

const rootReducer = combineReducers({
  form,
  data,
  forexData,
});

export default rootReducer;