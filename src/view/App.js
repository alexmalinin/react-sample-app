import React, { Component } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import SignIn from "./components/signIn/SignIn";
import SignUp from "./components/signUp/SignUp";
import HeaderBasic from "../components/layout/HeaderBasic";

class App extends Component {
  defaultPath = () => {
    const {
      signIn: { isLogIn }
    } = this.props;

    if (isLogIn) return <Redirect to="/dashboard/" />;
    else return asdfdsfds<Redirect to="/sign_in" />;
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/profile">
            <div>
              <div>IMMA HEADA</div>
              <Route path="/profile/info" component={SignUp} />
            </div>
          </Route>
          <Route path="/user">
            <div>
              <HeaderBasic />
              <Route path="/user/sign_in" component={SignIn} />
              <Route render={p => <Redirect to="/user/sign_in" />} />
            </div>
          </Route>
          <Route render={p => "HAHA 404"} />
        </Switch>
      </Router>
    );
  }
}

export default connect(({ signIn }) => ({
  signIn
}))(App);
