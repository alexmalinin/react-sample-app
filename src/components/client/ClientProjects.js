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
import { CLIENT, SPECIALIST } from "../../constants/user";
import { getUserType } from "../../helpers/functions";
import { run } from "../../helpers/scrollToElement";

class ClientProjects extends Component {
  state = {
    saved: false,
    loading: false
  };

  componentDidMount() {
    run(0)();
  }

  render() {
    return (
      <ContainerLarge>
        <SubHeader loading={this.state.loading} />
        <Container
          indentBot
          sidebarCondition
          transparent
          dashboardContainer
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
      const userType = getUserType();

      if (userType === CLIENT) this.props.showSortedProjects("customers");
      else if (userType === SPECIALIST)
        this.props.showSortedProjects("specialists");
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
      run(0)();
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
