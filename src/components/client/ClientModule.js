import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import SubHeader from "../layout/ProjectSubHeader";
import {
  Container,
  ContainerLarge
} from "../../styleComponents/layout/Container";
import { createProjectEpic } from "../../actions/actions";
import { run } from "../../helpers/scrollToElement";
import ClientModuleForm from "./forms/ClientModuleForm";

class ClientProjects extends Component {
  state = {
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
    const { projectId } = this.props;
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

export default connect(({ createEpic }) => ({ createEpic }), {
  createProjectEpic
})(ClientProjects);
