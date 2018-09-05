import React from "react";
import { Switch, Route } from "react-router-dom";

import signIn from "./signIn";
import signUp from "./signUp";
import confirmation from "./confirmation";
import forgotPassword from "./forgotPassword";
import confirmReset from "./confirmReset";
import resetPassword from "./resetPassword";
import createPassword from "./createPassword";
import profile from "./profile";
import dashboard from "./dashboard";
import NotFound from "@components/NotFound";

import defaultRoute from "./default";
import PrivateRoute from "../utils/hoc/PrivateRoute";
import GuestRoute from "../utils/hoc/GuestRoute";
import RedirectRoute from "../utils/decorators/RedirectRoute";
import AssignRoute from "../utils/decorators/AssignRoute";

import FlexDirection from "@styled/FlexDirection";

export default () => (
  <FlexDirection>
    <Switch>
      <Route exact path="/" component={defaultRoute} />
      <Route exact path="/index.html" component={defaultRoute} />
      <GuestRoute exact path="/sign_in" component={signIn} />
      <GuestRoute path="/sign_up" component={signUp} />
      <GuestRoute path="/confirm_email" component={confirmation} />
      <GuestRoute path="/forgot_password" component={forgotPassword} />
      <GuestRoute path="/confirm_reset" component={confirmReset} />
      <GuestRoute path="/reset_password" component={resetPassword} />
      <GuestRoute path="/create_password" component={createPassword} />
      <PrivateRoute path="/profile" component={profile} />
      <PrivateRoute path="/dashboard" component={dashboard} />

      <AssignRoute
        path="/api/v1/projects/:projectId/teams/:teamId/assign/:specialistId"
        assignPath="/dashboard/project/:projectId"
      />

      <AssignRoute
        path="/api/v1/teams/:teamId/assign/:specialistId"
        assignPath="/dashboard/teams"
      />

      <RedirectRoute
        path="/api/v1/:user/confirmation/:token"
        to="/create_password"
      />

      <RedirectRoute
        path="/api/v1/:user/password_reset/:token"
        to="/reset_password"
      />
      <Route component={NotFound} />
    </Switch>
  </FlexDirection>
);
