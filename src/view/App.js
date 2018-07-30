import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import PrivateRoute from "../decorators/PrivateRoute";
import AssignRoute from "../decorators/AssignRoute";

import SignIn from "./components/signIn/SignIn";
import SignUp from "./components/signUp/SignUp";
import Dashboard from "./components/layout/dashboard";
import Profile from "./components/profile";

class App extends Component {
  defaultPath = () => {
    const {
      signIn: { isLogIn }
    } = this.props;

    if (isLogIn) return <Redirect to="/dashboard/" />;
    else return <Redirect to="/sign_in" />;
  };

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" render={this.defaultPath} />

            <Route path="/index.html" render={this.defaultPath} />

            <PrivateRoute inverted path="/sign_in" component={SignIn} />

            <PrivateRoute inverted path="/sign_up" component={SignUp} />

            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect(({ signIn }) => ({
  signIn
}))(App);
