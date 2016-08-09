import { Map } from 'immutable';
import { DATA_LOADED } from '../constants/ActionTypes';

// create global events to let know when data is starting to load and not loading
// perrhaps convert to one GET_DATA event to go with the action
function app(state = Map({ loaded: false }), action) {
  switch (action.type) {
    case DATA_LOADED:
      state.merge({
        loaded: true,
      });
    default:
      return state;
  }
}