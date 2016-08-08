import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState, // perhaps save user values in localstorage and load here
    applyMiddleware(thunk)
  );
  return store;
}

export default configureStore;