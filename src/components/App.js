import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import FlexDirection from "../styleComponents/FlexDirection";
import Home from "./Home";
import NotFound from "./NotFound";
import Contact from "./Contact/Contact";
import PostProject from "./PostProject/PostProject";
import OverviewPostedProject from "./OverviewPostedProject";
import SignUp from "./SignUp/SignUp";
import SignIn from "./SignIn/SignIn";
import ForgotPassword from "./ResetPassword/ForgotPassword";
import Verification from "./Verification/Verification";
import ResetPage from "./ResetPassword/ResetPage";
import ConfirmReset from "./ResetPassword/ConfirmReset";
import ConfirmEmail from "./ConfirmEmail";
import ClientDashboard from "./client/ClientDashboard";
import SpecialistDashboard from "./specialist/pages/SpecialistsDashboard";
import { getUserType, getUserRole } from "../helpers/functions";
import { S_PASSIVE } from "../constans/constans";
import PrivateRoute from "../decorators/PrivateRoute";

class App extends Component {
  render() {
    let Dashboard;

    switch (getUserType()) {
      case "Specialist":
        Dashboard = SpecialistDashboard;
        break;
      case "Client":
        Dashboard = ClientDashboard;
        break;
      default:
        Dashboard = SignIn;
    }

    const token = localStorage.getItem("jwt_token");
    const passive = getUserRole() !== S_PASSIVE;

    return (
      <Router>
        <div>
          <FlexDirection>
            <Switch>
              <Route
                exact
                path="/"
                render={() =>
                  token && passive ? (
                    <Redirect to="/dashboard/" />
                  ) : (
                    <Redirect to="/sign_in" />
                  )
                }
              />
              <Route
                path="/index.html"
                render={() =>
                  token ? (
                    <Redirect to="/dashboard/" />
                  ) : (
                    <Redirect to="/sign_in" />
                  )
                }
              />
              <Route path="/home" component={Home} />
              <Route path="/contact" component={Contact} />
              <Route path="/post_project" component={PostProject} />
              <Route
                path="/project_overview"
                component={OverviewPostedProject}
              />
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
                path="/dashboard/project/:projectId/module/:moduleId"
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
              <PrivateRoute path="/dashboard/:page" component={Dashboard} />

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
