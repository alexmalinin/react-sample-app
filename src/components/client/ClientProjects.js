import React, { Component } from "react";
import { connect } from "react-redux";
import { hasSubmitSucceeded } from "redux-form";
import { Redirect } from "react-router";
import SubHeader from "../layout/ProjectSubHeader";
import {
  Container,
  ContainerLarge
} from "../../styleComponents/layout/Container";
import { showClientData, saveCreatedProgect } from "../../actions/actions";
import { S_Message } from "../../styleComponents/layout/S_Message";
import { Message } from "semantic-ui-react";
import ClientProjectForm from "./forms/ClientProjectForm";

class ClientProjects extends Component {
  state = {
    renderMessage: false,
    renderErrorMessage: false,
    saved: false,
    loading: false
  };

  render() {
    const { renderMessage, renderErrorMessage } = this.state;

    return (
      <ContainerLarge>
        <SubHeader loading={this.state.loading} />
        <Container
          indentBot
          sidebarCondition
          className={this.state.loading && "loading"}
        >
          <i className="fa fa-spinner fa-3x fa-pulse preloader" />
          <S_Message positive profile="true" data-show={renderMessage}>
            <Message.Header>Success!</Message.Header>
            <p>Project was created</p>
          </S_Message>
          <S_Message negative profile="true" data-show={renderErrorMessage}>
            <Message.Header>Error!</Message.Header>
            <p>Something went wrong, please try again</p>
          </S_Message>

          <ClientProjectForm onSubmit={this.submit} />

          {this.state.saved ? (
            <Redirect
              to={`/dashboard/project/${this.props.createProject.id}`}
            />
          ) : null}
        </Container>
      </ContainerLarge>
    );
  }

  componentWillReceiveProps(nextProps) {
    let createProject = nextProps.createProject;

    if (createProject && nextProps.submitSucceeded) {
      if (createProject.id) {
        setTimeout(() => {
          this.setState({
            loading: false,
            saved: true
          });
        }, 1000);
      }
    }

    if (nextProps.submitSucceeded) {
      this.showMessage("success");
    }
  }

  showMessage = status => {
    setTimeout(() => {
      return this.setState({
        renderMessage: false,
        renderErrorMessage: false
      });
    }, 1000);

    status === "success"
      ? this.setState({
          renderMessage: true
        })
      : this.setState({
          renderErrorMessage: true
        });
  };

  submit = values => {
    this.setState({
      loading: true
    });

    if (!this.props.submitSucceeded) {
      this.props.saveCreatedProgect(values);
    }
  };
}

export default connect(
  state => {
    const { createProject } = state;

    return {
      createProject,
      submitSucceeded: hasSubmitSucceeded("ClientProjectForm")(state)
    };
  },
  {
    showClientData,
    saveCreatedProgect
  }
)(ClientProjects);
