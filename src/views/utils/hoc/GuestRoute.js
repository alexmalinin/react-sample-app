import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, isAuthentificated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthentificated ? (
        <Redirect to="/dashboard" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const mapStateToProps = state => {
  return {
    isAuthentificated: !!state.user.token
  };
};

export default connect(mapStateToProps)(PrivateRoute);
