import {createBrowserHistory} from 'history';
import {applyMiddleware, createStore} from 'redux';
import {routerMiddleware} from 'connected-react-router';
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from 'redux-thunk';
import createRootReducer from './reducer.js';

export const history = createBrowserHistory();

export default function configureStore() {
  const store = createStore(
    createRootReducer(history),
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history),
        thunk,
      ),
    ),
  );

  return store;
}
