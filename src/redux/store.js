import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

const middlewares = [reduxThunk];

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
  // composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
