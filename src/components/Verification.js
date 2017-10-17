import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import HeaderIntro from './layout/HeaderIntro';
import DvGrid from '../styleComponents/layout/DvGrid'
import {DvTitle} from '../styleComponents/layout/DvTitles'
import DvForm from '../styleComponents/Tabs'
import { DvButton } from '../styleComponents/layout/DvButton'
import confirm from '../decorators/confirm'
import VerificationForm from './forms/VerificationForm'

class SignUp extends Component {

    render() {
        const { confirm, confirmAccount } = this.props;

        return (
            <main>
                <HeaderIntro/>
                <DvGrid width='1560px' indent_bot='230px'>
                    <DvTitle mTop='126'>
                        Account Verification
                    </DvTitle>
                    <DvForm>
                        <VerificationForm/>
                    </DvForm>
                    <DvButton className='verify-btn' onClick={confirmAccount} primary content='SAVE & CONTINUE'/>
                    { confirm && this.getUserRedirect() }
                </DvGrid>
            </main>
        )
    }

    getUserRedirect(){
        const { changeUserType } = this.props;

        return(
            <div>
                {changeUserType === 'Specialist' ?
                    <Redirect to="/specialists/dashboard/welcome-to-the-village-1"/> :
                    <Redirect to="/client/dashboard/welcome-to-the-village"/>
                }
            </div>
        )
    }
}

export default connect(({changeUserType}) => ({changeUserType}))(confirm(SignUp));