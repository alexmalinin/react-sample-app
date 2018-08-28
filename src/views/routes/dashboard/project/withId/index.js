import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";

import EnchancedRoute from "@views/utils/hoc/EnchancedRoute";

import { Container } from "@styled/Containers";
import StyledProject from "@components/Projects/StyledProject";

import BoardSubHeader from "@components/BoardSubHeader";
import EditProject from "@components/Projects/edit";
import Module from "@components/Module";
import CreateModule from "@components/CreateModule";
import NotFound from "@components/NotFound";

const Project = ({ project }) => {
  return (
    <Fragment>
      <BoardSubHeader />
      <Container indentBot sidebarCondition transparent dashboardContainer>
        <StyledProject>
          <Switch>
            <EnchancedRoute
              exact
              path={`/dashboard/project/:projectId`}
              title={project.name}
              component={EditProject}
            />
            <EnchancedRoute
              exact
              path={`/dashboard/project/:projectId/module/:num([0-9]+)/:status(edit|view)`}
              title={project.name}
              component={Module}
            />
            <EnchancedRoute
              exact
              path={`/dashboard/project/:projectId/module/new`}
              title={project.name}
              component={CreateModule}
            />
            <Route component={NotFound} />
          </Switch>
        </StyledProject>
      </Container>
    </Fragment>
  );
};

Project.defaultProps = {
  project: {}
};

const mapStateToProps = (state, props) => {
  return {
    project: state.projects[props.match.params.projectId]
  };
};

export default connect(mapStateToProps)(Project);
