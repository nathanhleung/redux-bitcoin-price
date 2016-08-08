import { combineReducers } from 'redux';
import form from './form';
import data from './data';

const rootReducer = combineReducers({
  form,
  data,
});

export default rootReducer;