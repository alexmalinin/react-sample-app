import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

const ProfileLayout = () => (
  <div>
    <Switch>
      <Route exact path="/profile" render={() => null} />
    </Switch>
  </div>
);

export default ProfileLayout;
