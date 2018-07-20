import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import thunkMiddleware from "redux-thunk";
import * as reducers from "./ducks";

const reduxDevTools =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    : window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(); // before production {}

export default function configureStore(initialState) {
  const rootReducer = combineReducers(reducers);

  return createStore(
    rootReducer,
    reduxDevTools,
    applyMiddleware(thunkMiddleware, promiseMiddleware())
  );
}
