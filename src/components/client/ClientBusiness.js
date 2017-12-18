import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderBasic from '../layout/HeaderBasic';
import { NavLink } from 'react-router-dom'
import SubHeader from '../layout/ClientSubHeader';
import { Grid } from 'semantic-ui-react';
import { DvTitle, DvTitleSmall } from '../../styleComponents/layout/DvTitles';
import { Container, ContainerLarge } from '../../styleComponents/layout/Container'
import { S_Message } from '../../styleComponents/layout/S_Message';
import RenderProjectCard from './renders/RenderProjectCard';
import ClientBusinessForm from './forms/ClientBusinessForm';
import { showClientData, updateClientBusiness } from '../../actions/actions';
import {NewTeamBtn} from '../../styleComponents/layout/DvButton';
import StyledClientTeam from '../../styleComponents/StyledClientTeam';
import Navbar from "../layout/Navbar";
import { Message } from 'semantic-ui-react';
import { run } from '../../helpers/scrollToElement';

class ClientBusiness extends Component {

    state = {
        renderMessage: false,
        renderErrorMessage: false,
    };

    componentWillMount() {
        // localStorage.removeItem('user_email');
        // sessionStorage.removeItem('client_step');
        this.props.showClientData();
    }

    render() {
        const { renderMessage, renderErrorMessage } = this.state;
        const {clientData} = this.props;

        return (
            <div>
                <HeaderBasic/>
                <ContainerLarge>
                    <DvTitle mTop="80">
                        Welcome to The Village!
                    </DvTitle>
                </ContainerLarge>

                <SubHeader/>

                <Container indentTop indentBot className="relative">
                    <S_Message positive profile data-show={renderMessage}>
                        <Message.Header>Success!</Message.Header>
                        <p>Form updated</p>
                    </S_Message>
                    <S_Message negative profile data-show={renderErrorMessage}>
                        <Message.Header>Error!</Message.Header>
                        <p>Something went wrong, please try again</p>
                    </S_Message>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column mobile={16} tablet={12} computer={8}>
                                <DvTitleSmall fz='28' xsCenter>Business</DvTitleSmall>
                                <ClientBusinessForm clientData={clientData} onSubmit={this.submit}/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        )
    }

    componentWillReceiveProps(nextProps) {
        let client = nextProps.clientData;
        console.log(nextProps)
        if (client.successBusinessId) {
            this.showMessage('success');
            run(0)();
        } else if(client.successBusinessId) {
            this.showMessage();
            run(0)();
        }
    }

    showMessage = status => {
        console.log('status');
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
        console.log(values);
        this.props.updateClientBusiness(values)
    }
}

export default connect(({ clientData }) => ({clientData}), {showClientData, updateClientBusiness })(ClientBusiness);
