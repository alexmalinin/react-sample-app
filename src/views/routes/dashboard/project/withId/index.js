import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";

import EnchancedRoute from "@views/utils/hoc/EnchancedRoute";

import { Container } from "@styled/Containers";
import StyledProject from "@components/Projects/StyledProject";

import BoardSubHeader from "@components/BoardSubHeader";
import EditProject from "@components/Projects/edit";
import Module from "./module";
import CreateModule from "@components/CreateModule";
import NotFound from "@components/NotFound";

import { getProjectEpics } from "@ducks/epics/actions";

class Project extends React.Component {
  static defaultProps = {
    project: {}
  };

  componentDidMount() {
    const { getProjectEpics, projectId } = this.props;
    getProjectEpics(projectId);
  }

  componentWillReceiveProps(nextProps) {
    const { projectId: prevProject } = this.props;
    const { projectId: nextProject, getProjectEpics } = nextProps;

    if (prevProject !== nextProject) {
      getProjectEpics(nextProject);
    }
  }

  render() {
    const { project } = this.props;

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
                path={`/dashboard/project/:projectId/module/:num([0-9]+)`}
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
  }
}

const mapStateToProps = (state, props) => {
  return {
    project: state.projects[props.match.params.projectId],
    projectId: props.match.params.projectId
  };
};

const mapDispatchToProps = {
  getProjectEpics
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
