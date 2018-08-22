import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import CreateProject from "./create";
import EditProject from "./edit";

const Project = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.url}/new`} component={CreateProject} />
      <Route path={`${match.url}/:projectId`} component={EditProject} />
    </Switch>
  );
};

export default Project;
