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
import ClientProjectForm from "./forms/ClientProjectForm";

class ClientProjects extends Component {

<<<<<<< e32ce54129c6540684de7c2698a8b31020a21e1e
  state = {
    renderMessage: false,
    renderErrorMessage: false,
  };

  render() {

    const { renderMessage, renderErrorMessage } = this.state;

    return (
      <div>

        <ContainerLarge>
          <SubHeader/>
          <Container indentBot>
            <S_Message positive profile data-show={renderMessage}>
              <Message.Header>Success!</Message.Header>
              <p>Form updated</p>
            </S_Message>
            <S_Message negative profile data-show={renderErrorMessage}>
              <Message.Header>Error!</Message.Header>
              <p>Something went wrong, please try again</p>
            </S_Message>

            <ClientProjectForm />
          </Container>
        </ContainerLarge>
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    let client = nextProps.clientData;

    if (client.successProfileId) {
      this.showMessage('success');
      run(0)();
    } else if(client.errorProfileId) {
      this.showMessage();
      run(0)();
=======
    render() {

        return (
            <StyledClientTeam>
                <HeaderBasic/>

                <SubHeader/>

                <Container indentTop  relative xsNoPadding>
                    <div className='gag'>
                        <h4>
                            Thank you for showing your<br/> interest, our Teams platform <br/>will be coming soon.
                        </h4>
                    </div>
                    <DvTitleSmall fz='28' indentNull xsCenter>My Projects</DvTitleSmall>

                    <div className='flex-wrapper'>
                        <RenderProjectCard/>
                        <RenderProjectCard/>
                        <RenderProjectCard/>
                    </div>
                </Container>

                <Container indentBot>
                    <NewTeamBtn>
                        <NavLink to='/post_project'/>
                        <span>Create a new team</span>
                    </NewTeamBtn>
                </Container>
            </StyledClientTeam>
        )
>>>>>>> [feature] kanban project page
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

<<<<<<< e32ce54129c6540684de7c2698a8b31020a21e1e
export default connect(({clientData}) => ({clientData}), {showClientData, updateClientProfile })(ClientProjects);
=======
export default ClientProjects;
>>>>>>> [feature] kanban project page
