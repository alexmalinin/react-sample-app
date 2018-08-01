import React from "react";
import { Route, Redirect } from "react-router-dom";

const checkAuth = () => !!localStorage.getItem("jwt_token");

export default ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      checkAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/sign_in",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);
