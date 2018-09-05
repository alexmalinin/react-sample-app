import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const DefaultRoute = ({ isAuthentificated, isLogged, ...rest }) => {
  let path = "/sign_in";
  if (isAuthentificated) {
    if (isLogged) path = "/dashboard";
    else path = "/profile/info";
  }
  return <Redirect to={path} />;
};

const mapStateToProps = state => {
  return {
    isAuthentificated: !!state.user.token,
    isLogged: !!state.user.status
  };
};

export default connect(mapStateToProps)(DefaultRoute);
