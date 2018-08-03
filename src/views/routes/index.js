import React from "react";
import { Switch, Route } from "react-router-dom";

import notFound from "../../components/NotFound";

import profile from "./profile";
import defaultRoute from "./default";
import PrivateRoute from "../utils/hoc/PrivateRoute";
import GuestRoute from "../utils/hoc/GuestRoute";

export default () => (
  <Switch>
    <Route exact path="/" component={defaultRoute} />
    <Route exact path="/index.html" component={defaultRoute} />
    <GuestRoute exact path="/sign_in" component={() => <div>"SignIn"</div>} />
    <PrivateRoute path="/dashboard" component={() => <div>dashboard</div>} />
    <Route path="/profile" component={profile} />
    <Route component={notFound} />
  </Switch>
);
