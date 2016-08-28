import { Map } from 'immutable';
import { GET_FOREX_DATA } from '../constants/ActionTypes';
import { PENDING, ERROR, SUCCESS } from '../constants/AsyncStates';

function forexData(state = Map({
  isPending: false,
  // not necessarily needed, since it's only updated once/day.
  // but maybe if we get a realtime source
  lastUpdated: 0,
  rates: Map(),
}), action) {
  switch (action.type) {
    case GET_FOREX_DATA: {
      switch(action.meta.status) {
        case PENDING:
          return state.merge({
            isPending: true,
          });
        case SUCCESS:
          return state.merge({
            isPending: false,
            rates: action.payload,
            lastUpdated: (new Date()).getTime(),
          });
      }
    }
    default: {
      return state;
    }
  }
}

export default forexData;