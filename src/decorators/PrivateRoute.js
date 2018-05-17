import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({
  component: Component,
  allowed,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props =>
        allowed ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/404", state: { from: props.location } }}
          />
        )
      }
    />
  );
}
