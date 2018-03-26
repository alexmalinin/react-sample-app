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

    constructor() {
        super();

        this.state = {
            renderMessage: false,
            renderErrorMessage: false,
            nextStep: false,
        };

        this.billing_type;

        this.paypal = {
            account_number: null,
            password: null,
        }

        this.creditCard = {
            card_name: null,
            card_number: null,
            expiry_date: null,
            ccv: null,
        }

        this.accounts = {
            account_details: null,
        }

        this.handleFormField = this.handleFormField.bind(this);
        this.swichTab = this.swichTab.bind(this);
    }

    handleFormField(e) {
        
        if (this.billing_type === '0') {
            let data = e.target.value;
            this.paypal[e.target.name] = data;
            this.props.calculatePagePercent('billingPercent', this.paypal);
        }

        if (this.billing_type === '1') {
            let data = e.target.value;
            this.creditCard[e.target.name] = data;
            this.props.calculatePagePercent('billingPercent', this.creditCard);
        }
        
        if (this.billing_type === '2') {
            let data = e.target.value;
            this.accounts[e.target.name] = data;
            this.props.calculatePagePercent('billingPercent', this.accounts);
        }
    }

    swichTab(tab) {
        this.billing_type = tab
    }

    setData() {

        if(this.props.clientData) {
            if(this.props.clientData.customer_billing) {
                const { billing_type, account_number, account_details, card_name, card_number, expiry_date, ccv, password } = this.props.clientData.customer_billing;

                this.billing_type = billing_type

                if (billing_type === 0) {
                    this.paypal = {
                        account_number,
                        password,
                    }
                }

                if (billing_type === 1) {
                    this.creditCard = {
                        card_name,
                        card_number,
                        expiry_date,
                        ccv,
                    }
                }    
                
                if (billing_type === 2) {
                    this.accounts = {
                        account_details,
                    }
                }
            }
        }
    }

    componentWillMount() {
      this.props.showClientData();
    }

    render() {
        const { clientData } = this.props;
        const { renderErrorMessage, renderMessage } = this.state;

        return (
            <div>
                <S_Message positive profile data-show={renderMessage}>
                    <Message.Header>Success!</Message.Header>
                    <p>Form updated</p>
                </S_Message>
                <S_Message negative profile data-show={renderErrorMessage}>
                    <Message.Header>Error!</Message.Header>
                    <p>Something went wrong, please try again</p>
                </S_Message>
                {/* <DvTitleSmall fz='28' xsCenter>My Billing</DvTitleSmall> */}
                <ClientBillingForm handleFormField={this.handleFormField} swichTab={this.swichTab} clientData={clientData} onSubmit={this.submit}/>
                {this.state.nextStep && <Redirect to="board"/>}
            </div>
        )
    }

    componentWillReceiveProps(nextProps) {
        let client = nextProps.clientData;

        if (client) {
            if (client.first_name) {
                this.setData()
            }
        }

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
        this.props.updateClientBilling(values)
    }
}

export default connect(
    ({ industries, clientData }) => ({ industries, clientData }), 
    { getIndustries, showClientData, updateClientBilling }
)(ClientBilling);
