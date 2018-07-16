import React from "react";
import { Route, Redirect } from "react-router-dom";

const checkAuth = inverted => {
  const token = localStorage.getItem("jwt_token");
  if (inverted) {
    return !token;
  }

  return !!token;
};

export default ({ component: Component, inverted, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      checkAuth(inverted) ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: inverted ? "/dashboard/" : "/sign_in",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);
