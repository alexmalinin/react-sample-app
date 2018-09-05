import React, { Component } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import FlexDirection from "../styleComponents/FlexDirection";
import NotFound from "./NotFound";
import SignUp from "./SignUp/SignUp";
import SignIn from "./SignIn/SignIn";
import ForgotPassword from "./ResetPassword/ForgotPassword";
import Verification from "./Verification/Verification";
import ResetPage from "./ResetPassword/ResetPage";
import ConfirmReset from "./ResetPassword/ConfirmReset";
import ConfirmEmail from "./ConfirmEmail";
import ClientIndex from "./client";
import SpecialistIndex from "./specialist";
import { getUserType, getUserRole } from "../helpers/functions";
import PrivateRoute from "../decorators/PrivateRoute";
import AssignRoute from "../decorators/AssignRoute";
import { S_PASSIVE } from "../constants/user";

class App extends Component {
  defaultPath = () => {
    const token = localStorage.getItem("jwt_token");

    if (token) {
      if (getUserRole() === S_PASSIVE)
        return <Redirect to="/dashboard/about" />;
      else return <Redirect to="/dashboard/" />;
    } else return <Redirect to="/sign_in" />;
  };

  render() {
    let Dashboard;

    switch (getUserType()) {
      case "Specialist":
        Dashboard = SpecialistIndex;
        break;
      case "Client":
        Dashboard = ClientIndex;
        break;
      default:
        Dashboard = <Redirect to="/sign_in" />;
    }

    return (
      <Router>
        <div>
          <FlexDirection>
            <Switch>
              <Route exact path="/" render={this.defaultPath} />
              <Route path="/index.html" render={this.defaultPath} />
              <Route path="/sign_in" component={SignIn} />
              <Route path="/forgot_password" component={ForgotPassword} />
              <Route path="/sign_up" component={SignUp} />
              {this.renderToken()}
              {this.resetPassword()}
              <Route path="/confirm_email" component={ConfirmEmail} />
              <Route path="/reset_password" component={ConfirmReset} />

              <PrivateRoute exact path="/dashboard/" component={Dashboard} />
              <PrivateRoute
                path="/dashboard/project/:projectNewModule/module/new"
                component={Dashboard}
              />
              <PrivateRoute
                path="/dashboard/project/:projectId/module/:moduleId/:status"
                component={Dashboard}
              />
              <PrivateRoute
                path="/dashboard/project/:projectId"
                component={Dashboard}
              />
              <PrivateRoute
                path="/dashboard/specialist/:specialistId"
                component={Dashboard}
              />
              <PrivateRoute
                path="/profile/:profilePage"
                component={Dashboard}
              />
              <PrivateRoute path="/dashboard/:page" component={Dashboard} />

              <AssignRoute
                path="/api/v1/projects/:projectId/teams/:teamId/assign/:specialistId"
                assignPath="/dashboard/project/:projectId"
              />

              <AssignRoute
                path="/api/v1/teams/:teamId/assign/:specialistId"
                assignPath="/dashboard/teams"
              />

              <Route path="/404" component={NotFound} />
              <Route path="*" component={NotFound} />
            </Switch>
          </FlexDirection>
        </div>
      </Router>
    );
  }

  resetPassword = () => {
    return (
      <Route
        key=""
        path="/api/v1/:user/password_reset/:token"
        render={props => <ResetPage {...props} />}
      />
    );
  };

  renderToken = () => {
    return [
      <Route
        key="0"
        path="/api/v1/:user/confirmation/:token"
        render={props => <Verification {...props} user="Specialist" />}
      />,
      <Route
        key="1"
        path="/api/v1/:user/confirmation/:token"
        render={props => <Verification {...props} user="Client" />}
      />
    ];
  };
}

export default connect(({ changeUserType, signInReducer }) => ({
  changeUserType,
  signInReducer
}))(App);
