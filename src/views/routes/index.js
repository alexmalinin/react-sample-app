import React from "react";
import { Switch, Route } from "react-router-dom";

import signIn from "./signIn";
import signUp from "./signUp";
import confirmation from "./confirmation";
import profile from "./profile";
import dashboard from "./dashboard";
import notFound from "../../components/NotFound";

import defaultRoute from "./default";
import PrivateRoute from "../utils/hoc/PrivateRoute";
import GuestRoute from "../utils/hoc/GuestRoute";

import FlexDirection from "@styled/FlexDirection";

export default () => (
  <FlexDirection>
    <Switch>
      <Route exact path="/" component={defaultRoute} />
      <Route exact path="/index.html" component={defaultRoute} />
      <GuestRoute exact path="/sign_in" component={signIn} />
      <Route path="/sign_up" component={signUp} />
      <Route path="/confirm_email" component={confirmation} />
      <Route path="/profile" component={profile} />
      <PrivateRoute path="/dashboard" component={dashboard} />
      <Route component={notFound} />
    </Switch>
  </FlexDirection>
);
