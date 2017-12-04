import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { Grid } from 'semantic-ui-react';
import HeaderIntro from '../layout/HeaderIntro';
import { DvTitleMedium } from '../../styleComponents/layout/DvTitles';
import ForgotPasswordForm from './ForgotPasswordForm';
import { Container } from "../../styleComponents/layout/Container";
import { getTokenForResetPassword } from '../../actions/actions';

class ForgotPassword extends Component {

    state = {
        confirm: false,
    };

    render() {

        return (
            <div>
                <HeaderIntro/>
                <Container indentBot indentTop>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <DvTitleMedium mTop='137' fz='' left xs>
                                    Forgot
                                    <br/>
                                    Password/
                                </DvTitleMedium>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column tablet={16} computer={8}>
                                <ForgotPasswordForm onSubmit={ this.submit }/>
                                { this.state.confirm && <Redirect to='/reset_password'/> }
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        )
    }

    submit = (email) => {
        let user = sessionStorage.getItem('user');
        localStorage.setItem('user_email', email['email']);
        this.props.getTokenForResetPassword(email, user);
        this.setState({
            confirm: !this.state.confirm
        })
    }
}

export default connect(null, {getTokenForResetPassword})(ForgotPassword)