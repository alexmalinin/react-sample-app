import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import HeaderBasic from '../layout/HeaderBasic';
import { NavLink } from 'react-router-dom'
import SubHeader from '../layout/ProjectSubHeader';
import { Grid } from 'semantic-ui-react'
import { Container, ContainerLarge } from '../../styleComponents/layout/Container';
import { createProjectEpic, showProjectWithId, showAllEpics } from '../../actions/actions';
import { S_Message } from '../../styleComponents/layout/S_Message';
import { Message } from 'semantic-ui-react';
import { run } from '../../helpers/scrollToElement';
import Navbar from "../layout/Navbar";
import ClientModuleForm from './forms/ClientModuleForm';

class ClientProjects extends Component {

  state = {
    renderMessage: false,
    renderErrorMessage: false,
    saved: false,
  };

  componentWillMount() {
    const { projectId } = this.props;
    run(0)();
  }

  render() {
    const { projectId, projectWithId } = this.props;
    const { renderMessage, renderErrorMessage } = this.state;

    return (
        <ContainerLarge>
          <SubHeader module projectId={projectId}/>
          <Container indentBot>
            {/* <S_Message positive profile data-show={renderMessage}>
              <Message.Header>Success!</Message.Header>
              <p>Form updated</p>
            </S_Message>
            <S_Message negative profile data-show={renderErrorMessage}>
              <Message.Header>Error!</Message.Header>
              <p>Something went wrong, please try again</p>
            </S_Message> */}

            <ClientModuleForm onSubmit={this.submit} />
            {this.state.saved ? <Redirect to={`/client/project/${projectId}/module/all`}/> : null }
          </Container>
        </ContainerLarge>
    );
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
  };

  submit = values => {
    const { projectId } = this.props;
    this.props.createProjectEpic(values, projectId);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.createEpic){
      if(nextProps.createEpic.successEpicId){
        this.setState({
          saved: true
        })
      }
    }
  }
}

export default connect(
  ({projectWithId, createEpic}) => ({projectWithId, createEpic}),
  {createProjectEpic, showProjectWithId}
)(ClientProjects);
