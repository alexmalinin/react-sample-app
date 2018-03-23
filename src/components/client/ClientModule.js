import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderBasic from '../layout/HeaderBasic';
import { NavLink } from 'react-router-dom'
import SubHeader from '../layout/ProjectSubHeader';
import { Grid } from 'semantic-ui-react'
import { Container, ContainerLarge } from '../../styleComponents/layout/Container';
import { showClientData, updateClientProfile } from '../../actions/actions';
import { S_Message } from '../../styleComponents/layout/S_Message';
import { Message } from 'semantic-ui-react';
import { run } from '../../helpers/scrollToElement';
import Navbar from "../layout/Navbar";
import ClientModuleForm from './forms/ClientModuleForm';

class ClientProjects extends Component {

  state = {
    renderMessage: false,
    renderErrorMessage: false,
  };

  render() {

    const { renderMessage, renderErrorMessage } = this.state;

    return (
        <ContainerLarge>
          <SubHeader module/>
          <Container indentBot>
            <S_Message positive profile data-show={renderMessage}>
              <Message.Header>Success!</Message.Header>
              <p>Form updated</p>
            </S_Message>
            <S_Message negative profile data-show={renderErrorMessage}>
              <Message.Header>Error!</Message.Header>
              <p>Something went wrong, please try again</p>
            </S_Message>

            <ClientModuleForm/>
          </Container>
        </ContainerLarge>
    );
  }

  componentWillReceiveProps(nextProps) {
    let client = nextProps.clientData;

    if (client.successProfileId) {
      this.showMessage('success');
      run(0)();
    } else if(client.errorProfileId) {
      this.showMessage();
      run(0)();
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
  };
}

export default connect(({clientData}) => ({clientData}), {showClientData, updateClientProfile })(ClientProjects);
