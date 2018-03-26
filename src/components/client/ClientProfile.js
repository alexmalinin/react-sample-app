import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import HeaderBasic from '../layout/HeaderBasic';
import SubHeader from '../layout/ClientSubHeader';
import { Grid } from 'semantic-ui-react'
import { DvTitle , DvTitleSmall } from '../../styleComponents/layout/DvTitles';
import RenderProfileForm from '../forms/RenderProfileForm';
import RenderResetPasswordForm from '../forms/RenderResetPasswordForm';
import { Container, ContainerLarge } from '../../styleComponents/layout/Container';
import { showClientData, updateClientProfile } from '../../actions/actions';
import { S_Message } from '../../styleComponents/layout/S_Message';
import { Message } from 'semantic-ui-react';
import { run } from '../../helpers/scrollToElement';

class ClientProfile extends Component {

    constructor() {
        super();

        this.state = {
            renderMessage: false,
            renderErrorMessage: false,
            nextStep: false,
        };

        this.data = {
            first_name: null,
            last_name: null,
            email: null,
            city: null,
            country: null,
            phone_number: null,
            professional_experience_info: null,
        }

        this.handleFormField = this.handleFormField.bind(this);
    }

    handleFormField(e) {
        let data = e.target.value;
        this.data[e.target.name] = data;
        
        this.props.calculatePagePercent('profilePercent', this.data);
    }

    setData() {
        if(this.props.clientData) {
            if(this.props.clientData.first_name) {
                const { first_name, last_name, email, address: {city, country}, phone_number, professional_experience_info } = this.props.clientData;
                this.data = {
                    first_name,
                    last_name,
                    email,
                    city,
                    country,
                    phone_number,
                    professional_experience_info,
                }
            }
        }
    }

    componentWillMount() {
        localStorage.removeItem('user_email');
        sessionStorage.removeItem('client_step');
        this.props.showClientData();
    }

    render() {
        const { renderMessage, renderErrorMessage } = this.state;

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
                <Grid>
                    <Grid.Row>
                        <Grid.Column mobile={16} tablet={12} computer={16}>
                            {/* <DvTitleSmall fz='28' xsCenter>Profile</DvTitleSmall> */}
                            <RenderProfileForm handleFormField={this.handleFormField} onSubmit={this.submit}/>
                            {this.state.nextStep && <Redirect to="company"/>}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column mobile={16} tablet={12} computer={16}>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column mobile={16} tablet={12} computer={3}>
                                    </Grid.Column>
                                    <Grid.Column mobile={16} tablet={12} computer={10}>
                                        <DvTitleSmall fz='28' xsCenter>Change Password</DvTitleSmall>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <RenderResetPasswordForm user="customer"/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }

    componentWillReceiveProps(nextProps) {
        let client = nextProps.clientData;
        let password = nextProps.confirmPassword;

        if (client) {
            if (client.first_name) {
                this.setData()
            }
        }

        if (client.successProfileId) {
            this.showMessage('success');
            run(0)();
        } else if(client.errorProfileId) {
            this.showMessage();
            run(0)();
        } else if(password) {
            if (password.successPasswordId) {
                this.showMessage('success');
                run(0)();
            } else if (password.errorPasswordId) {
                this.showMessage();
                run(0)();
            }
        }
    }

    showMessage = status => {
        setTimeout( () => this.setState({
                    renderMessage: false,
                    renderErrorMessage: false,
                }), 1500
        );

        status === 'success'
            ? this.setState({
                renderMessage: true,
                nextStep: true,
            })
            : this.setState({
                renderErrorMessage: true,
            });
    }

    submit = values => {
        this.props.updateClientProfile(values);
    }

}

export default connect(({clientData, confirmPassword}) => ({clientData, confirmPassword}), {showClientData, updateClientProfile })(ClientProfile);
