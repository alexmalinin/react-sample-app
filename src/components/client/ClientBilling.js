import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import HeaderBasic from '../layout/HeaderBasic';
import { NavLink } from 'react-router-dom'
import SubHeader from '../layout/ClientSubHeader';
import { Grid } from 'semantic-ui-react';
import { DvTitle, DvTitleSmall } from '../../styleComponents/layout/DvTitles';
import { Container, ContainerLarge } from '../../styleComponents/layout/Container'
import { S_Message } from '../../styleComponents/layout/S_Message';
import RenderProjectCard from './renders/RenderProjectCard';
import ClientBillingForm from './forms/ClientBillingForm';
import { showClientData,  getIndustries, updateClientBilling } from '../../actions/actions';
import {NewTeamBtn} from '../../styleComponents/layout/DvButton';
import StyledClientTeam from '../../styleComponents/StyledClientTeam';
import Navbar from "../layout/Navbar";
import { Message } from 'semantic-ui-react';
import { run } from '../../helpers/scrollToElement';

class ClientBilling extends Component {

    state = {
        renderMessage: false,
        renderErrorMessage: false,
        nextStep: false,
    };

    componentWillMount() {
      this.props.showClientData();
    }

    render() {
        const { clientData } = this.props;
        const { renderErrorMessage, renderMessage } = this.state;

        return (
            <ContainerLarge>
                <Container indentBot className="relative">

                    <SubHeader/>

                    <S_Message positive profile data-show={renderMessage}>
                        <Message.Header>Success!</Message.Header>
                        <p>Form updated</p>
                    </S_Message>
                    <S_Message negative profile data-show={renderErrorMessage}>
                        <Message.Header>Error!</Message.Header>
                        <p>Something went wrong, please try again</p>
                    </S_Message>
                    {/* <DvTitleSmall fz='28' xsCenter>My Billing</DvTitleSmall> */}
                    <ClientBillingForm clientData={clientData} onSubmit={this.submit}/>
                    {this.state.nextStep && <Redirect to="board"/>}
                </Container>
            </ContainerLarge>
        )
    }

    componentWillReceiveProps(nextProps) {
        let client = nextProps.clientData;
        if (client && client.successBillingId) {
            this.showMessage('success');
            run(0)();
        } else if(client && client.successBillingId) {
            this.showMessage();
            run(0)();
        }
    }

    showMessage = status => {
        setTimeout( () => this.setState({
                    renderMessage: false,
                    renderErrorMessage: false,
                    nextStep: true,
                }), 1500
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
        console.log('values', values);
        this.props.updateClientBilling(values)
    }
}

export default connect(
    ({ industries, clientData }) => ({ industries, clientData }), 
    { getIndustries, showClientData, updateClientBilling }
)(ClientBilling);
