import React from "react";
import { Route, Redirect } from "react-router-dom";

const checkAuth = () => {
  const token = localStorage.getItem("jwt_token");
  if (!token) {
    return false;
  }

  return true;
};

export default ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      checkAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/sign_in", state: { from: props.location } }}
        />
      )
    }
  />
);
