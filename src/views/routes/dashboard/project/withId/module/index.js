import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";

import Kanban from "@components/Kanban";
import Module from "@components/Module";

const ModuleLayout = () => {
  return (
    <Switch>
      <Route
        exact
        path={`/dashboard/project/:projectId/module/:num/:status(view)`}
        component={Kanban}
      />

      <Route
        exact
        path={`/dashboard/project/:projectId/module/:num/:status(edit)`}
        component={Module}
      />
      <Redirect
        from="/dashboard/project/:projectId/module/:num"
        to="/dashboard/project/:projectId/module/:num/view"
      />
    </Switch>
  );
};

export default ModuleLayout;
