import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// import store from "./store/store";
import store from "./state/store";
import App from "./components/App";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import Test from "./Test";

ReactDOM.render(
  <Provider store={store}>
    <App />
    {/* <Test /> */}
  </Provider>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}
