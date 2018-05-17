import React, { Component } from "react";
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
import PrivateRoute from "../decorators/PrivateRoute";
import { getUserRole } from "../helpers/functions";
import { S_PASSIVE } from "../constans/constans";

class App extends Component {
  render() {
    const { changeUserType } = this.props;
    let Dashboard;

    switch (changeUserType) {
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

    return (
      <Router>
        <div>
          <FlexDirection>
            <Switch>
              <Route
                exact
                path="/"
                render={() =>
                  token ? (
                    <Redirect to="/dashboard/" />
                  ) : (
                    <Redirect to="/sign_in" />
                  )
                }
              />
              <Route
                path="/index.html"
                component={() =>
                  token ? (
                    <Redirect to="/dashboard/" />
                  ) : (
                    <Redirect to="/sign_in" />
                  )
                }
              />
              <Route path="/home" component={Home} />
              <Route path="/contact" component={Contact} />
              <Route path="/how_it_works" component={NotFound} />
              <Route path="/projects" component={NotFound} />
              <Route path="/specialist_profiles" component={NotFound} />
              <Route path="/contact" component={NotFound} />
              <Route path="/qas" component={NotFound} />
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
              {!token &&
                !localStorage.getItem("user_email") && (
                  <Redirect to="/sign_in" />
                )}
              <Route path="/confirm_email" component={ConfirmEmail} />
              <Route path="/reset_password" component={ConfirmReset} />

              <Route exact path="/dashboard/" component={Dashboard} />

              <Route
                path="/dashboard/project/:projectNewModule/module/new"
                component={Dashboard}
              />
              <Route
                path="/dashboard/project/:projectId/module/:moduleId"
                component={Dashboard}
              />
              <Route
                path="/dashboard/project/:projectId"
                component={Dashboard}
              />
              <Route path="/dashboard/:page" component={Dashboard} />
              {/* <PrivateRoute
                exact
                to="/dashboard/:page"
                allowed={getUserRole() !== S_PASSIVE}
                component={Dashboard}
              /> */}

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
