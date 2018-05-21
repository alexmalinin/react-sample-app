import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import SubHeader from "../layout/ProjectSubHeader";
import {
  Container,
  ContainerLarge
} from "../../styleComponents/layout/Container";
import { createProjectEpic, showProjectWithId } from "../../actions/actions";
import { run } from "../../helpers/scrollToElement";
import ClientModuleForm from "./forms/ClientModuleForm";

class ClientProjects extends Component {
  state = {
    renderMessage: false,
    renderErrorMessage: false,
    saved: false
  };

  componentWillMount() {
    run(0)();
  }

  render() {
    const { projectId } = this.props;

    return (
      <ContainerLarge>
        <SubHeader module projectId={projectId} />
        <Container sidebarCondition={true} indentBot>
          <ClientModuleForm onSubmit={this.submit} />
          {this.state.saved && (
            <Redirect to={`/dashboard/project/${projectId}`} />
          )}
        </Container>
      </ContainerLarge>
    );
  }

  submit = values => {
    const { projectId, allEpics } = this.props;
    // values.name = `Module ${allEpics.length + 1} - ${values.name}`;
    this.props.createProjectEpic(values, projectId);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.createEpic) {
      if (nextProps.createEpic.successEpicId) {
        this.setState({
          saved: true
        });
      }
    }
  }
}

export default connect(
  ({ projectWithId, createEpic, allEpics }) => ({
    projectWithId,
    createEpic,
    allEpics
  }),
  { createProjectEpic, showProjectWithId }
)(ClientProjects);
