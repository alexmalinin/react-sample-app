import React from "react";
import { Switch, Route } from "react-router-dom";

import profile from "./profile";

export default () => (
  <Switch>
    <Route path="/profile" component={profile} />
  </Switch>
);
