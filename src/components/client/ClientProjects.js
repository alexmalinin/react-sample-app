import React, { Component } from "react";
import { connect } from "react-redux";
import { hasSubmitSucceeded } from "redux-form";
import { Redirect } from "react-router";
import SubHeader from "../layout/ProjectSubHeader";
import {
  Container,
  ContainerLarge
} from "../../styleComponents/layout/Container";
import { saveCreatedProgect, showSortedProjects } from "../../actions/actions";
import ClientProjectForm from "./forms/ClientProjectForm";

class ClientProjects extends Component {
  state = {
    saved: false,
    loading: false
  };

  render() {
    return (
      <ContainerLarge>
        <SubHeader loading={this.state.loading} />
        <Container
          indentBot
          sidebarCondition
          className={this.state.loading && "loading"}
        >
          <i className="fa fa-spinner fa-3x fa-pulse preloader" />

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
    const { createProject } = nextProps;

    if (createProject && nextProps.submitSucceeded) {
      this.props.showSortedProjects("customers");
      if (createProject.id) {
        setTimeout(() => {
          this.setState({
            loading: false,
            saved: true
          });
        }, 1000);
      }
    }
  }

  submit = values => {
    this.setState({
      loading: true
    });

    if (!this.props.submitSucceeded) {
      this.props.saveCreatedProgect(values);
    }
  };
}

const mapStateToProps = (state, ownProps) => {
  return {
    createProject: state.createProject,
    submitSucceeded: hasSubmitSucceeded("ClientProjectForm")(state)
  };
};

export default connect(mapStateToProps, {
  showSortedProjects,
  saveCreatedProgect
})(ClientProjects);
