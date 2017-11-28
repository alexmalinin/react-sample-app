import React, { Component } from 'react';
import { connect } from 'react-redux';
import {change} from 'redux-form';
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

    state = {
        renderMessage: false,
        renderErrorMessage: false,
    };


    componentWillMount() {
        localStorage.removeItem('user_email');
        sessionStorage.removeItem('client_step');
        this.props.showClientData();
    }

    render() {
        const { renderMessage, renderErrorMessage } = this.state;

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
                                <DvTitleSmall fz='28' xsCenter>Profile</DvTitleSmall>
                                <RenderProfileForm onSubmit={this.submit}/>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column mobile={16} tablet={12} computer={8}>
                                <DvTitleSmall fz='28' mTop='60' xsCenter>Change Password</DvTitleSmall>
                                <RenderResetPasswordForm onSubmit={this.submitReset}/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        )
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.clientData.successProfileId) {
            this.showMessage('success');
            run(0)();
        } else if(nextProps.clientData.errorProfileId) {
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

    submit = values => {
        this.props.updateClientProfile(values);
    };

    submitReset = passwords => {
        console.log(passwords)
    }
}

export default connect(({clientData}) => ({clientData}), {showClientData, updateClientProfile})(ClientProfile);
