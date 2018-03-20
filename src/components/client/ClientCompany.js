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
import ClientCompanyForm from './forms/ClientCompanyForm';
import { showClientData,  getIndustries, updateClientCompany } from '../../actions/actions';
import {NewTeamBtn} from '../../styleComponents/layout/DvButton';
import StyledClientTeam from '../../styleComponents/StyledClientTeam';
import Navbar from "../layout/Navbar";
import { Message } from 'semantic-ui-react';
import { run } from '../../helpers/scrollToElement';

class ClientCompany extends Component {

    state = {
        renderMessage: false,
        renderErrorMessage: false,
    };

    componentWillMount() {
      this.props.getIndustries();
      this.props.showClientData();
    }

    render() {
        const { renderMessage, renderErrorMessage } = this.state;
        const { clientData, industries } = this.props;
        console.log('s', industries);
        return (
            <div>
                <Container indentTop indentBot className="relative">

                    <SubHeader/>

                    <S_Message positive profile data-show={renderMessage}>
                        <Message.Header>Success!</Message.Header>
                        <p>Form updated</p>
                    </S_Message>
                    <S_Message negative profile data-show={renderErrorMessage}>
                        <Message.Header>Error!</Message.Header>
                        <p>Something went wrong, please try again</p>
                    </S_Message>
                    {/* <DvTitleSmall fz='28' xsCenter>My Company</DvTitleSmall> */}
                    <ClientCompanyForm industries={industries} clientData={clientData} onSubmit={this.submit}/>
                </Container>
            </div>
        )
    }

    componentWillReceiveProps(nextProps) {
        let client = nextProps.clientData;
        console.log('next props', nextProps)
        if (client && client.successCompanyId) {
            this.showMessage('success');
            run(0)();
        } else if(client && client.successCompanyId) {
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
        console.log('values', values);
        this.props.updateClientCompany(values)
    }
}

export default connect(
    ({ industries, clientData }) => ({ industries, clientData }), 
    {getIndustries, showClientData, updateClientCompany }
)(ClientCompany);
