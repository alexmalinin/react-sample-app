import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import HeaderBasic from '../layout/HeaderBasic';
import { NavLink } from 'react-router-dom'
import SubHeader from '../layout/ProjectSubHeader';
import { Grid } from 'semantic-ui-react'
import { Container, ContainerLarge } from '../../styleComponents/layout/Container';
import { showClientData, saveCreatedProgect } from '../../actions/actions';
import { S_Message } from '../../styleComponents/layout/S_Message';
import { Message } from 'semantic-ui-react';
import { run } from '../../helpers/scrollToElement';
import Navbar from "../layout/Navbar";
import ClientProjectForm from "./forms/ClientProjectForm";

class ClientProjects extends Component {

  state = {
    renderMessage: false,
    renderErrorMessage: false,
    saved: false,
    activeProject: ''
  };

  render() {

    const { renderMessage, renderErrorMessage } = this.state;

    return (
        <ContainerLarge>
          <SubHeader/>
          <Container indentBot>
            <S_Message positive profile="true" data-show={renderMessage}>
              <Message.Header>Success!</Message.Header>
              <p>Form updated</p>
            </S_Message>
            <S_Message negative profile="true" data-show={renderErrorMessage}>
              <Message.Header>Error!</Message.Header>
              <p>Something went wrong, please try again</p>
            </S_Message>

            <ClientProjectForm onSubmit={this.submit}/>
            {this.state.saved ? <Redirect to={`/client/project/${this.props.createProject.id}`}/> : null }
          </Container>
        </ContainerLarge>
    );
  }

  componentWillReceiveProps(nextProps) {
    let client = nextProps.clientData;
    let createProject = nextProps.createProject;

    if (client.successProfileId) {
      this.showMessage('success');
      run(0)();
    } else if(client.errorProfileId) {
      this.showMessage();
      run(0)();
    }

    if(createProject) {
      if(createProject.id) {
        this.setState({
          activeProject: createProject.id,
          saved: true,
        });
      }
    }
  }

  showMessage = status => {
    setTimeout( () => {
        return this.setState({
          renderMessage: false,
          renderErrorMessage: false,
        })
      }, 2000
    );

    status === 'success'
      ? this.setState({
      renderMessage: true,
    })
      : this.setState({
      renderErrorMessage: true,
    })
  }

  submit = values => {
    this.props.saveCreatedProgect(values);
    this.props.updateProjectList();
  }

}

export default connect(
  ({clientData, createProject}) => ({clientData, createProject}),
  {showClientData, saveCreatedProgect}
)(ClientProjects);
