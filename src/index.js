import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import history from "./history";

import "semantic-ui-css/semantic.min.css";

import store from "./state/store";
import App from "./views/routes";

import "./index.css";

import { userOperations } from "@ducks/user";
import { setAuthorizationHeader } from "@ducks/user/utils";

if (localStorage.jwt_token) {
  setAuthorizationHeader(localStorage.jwt_token);
  store.dispatch(userOperations.userLoggedIn(localStorage.jwt_token));
  store.dispatch(userOperations.getUserData());
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}
