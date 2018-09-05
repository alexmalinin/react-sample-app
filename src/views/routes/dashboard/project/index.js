import React from "react";
import { Route, Switch } from "react-router-dom";

import CreateProject from "./create";
import ProjectWithId from "./withId";

import EnchancedRoute from "../../../utils/hoc/EnchancedRoute";
import { S_REDGUY, CUSTOMER } from "@utilities";
import NotFound from "@components/NotFound";

const Project = ({ match }) => {
  return (
    <Switch>
      <EnchancedRoute
        path={`${match.url}/new`}
        component={CreateProject}
        allowed={[S_REDGUY, CUSTOMER]}
        title="Create project"
      />
      <EnchancedRoute
        path={`${match.url}/:projectId([0-9]+)`}
        component={ProjectWithId}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Project;
