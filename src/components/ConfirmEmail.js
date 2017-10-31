import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import HeaderIntro from './layout/HeaderIntro';
import {DvTitle} from '../styleComponents/layout/DvTitles';
import DvForm from '../styleComponents/Tabs';
import { DvButton } from '../styleComponents/layout/DvButton';
import confirm from '../decorators/confirm';
import VerificationForm from './Verification/VerificationForm';
import { Container } from '../styleComponents/layout/Container';

class ConfirmEmail extends Component {

    render() {
        const { confirm, confirmAccount, signUpData } = this.props;

        return (
            <main>
                <HeaderIntro/>
                <Container indentBot>
                    <DvTitle mTop='126'>
                        Confirmation
                    </DvTitle>
                    <p>Please confirm your email: <b>{signUpData ? signUpData.data.email : localStorage.getItem('user_email')}</b> </p>
                    {/*<DvButton className='verify-btn' onClick={confirmAccount} primary content='SAVE & CONTINUE'/>*/}
                    {/*{ confirm && this.getUserRedirect() }*/}
                </Container>
            </main>
        )
    }

    // getUserRedirect(){
    //     return(
    //         <div>
    //             { <Redirect to="/verification"/> }
    //         </div>
    //     )
    // }
    //
    // getToken(signUpData, email) {
    //     if(!signUpData) return;
    //     return email = signUpData.data.token;
    // }
}

export default connect(({changeUserType, signUpData}) => ({changeUserType, signUpData}))(confirm(ConfirmEmail));