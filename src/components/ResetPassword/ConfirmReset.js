import React, { Component } from 'react';
import HeaderIntro from '../layout/HeaderIntro';
import {DvTitle} from '../../styleComponents/layout/DvTitles';
import { Container } from '../../styleComponents/layout/Container';

class ResetPassword extends Component {

    render() {
        const { signUpData } = this.props;

        return (
            <main>
                <HeaderIntro/>
                <Container indentBot>
                    <DvTitle mTop='126'>
                        Reset Password
                    </DvTitle>
                    <p>Please reset your password by link on your email: <b>{localStorage.getItem('user_email')}</b></p>
                </Container>
            </main>
        )
    }
}

export default ResetPassword