import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import HeaderIntro from './layout/HeaderIntro';
import DvGrid from '../styleComponents/DvGrid'
import {DvTitle} from '../styleComponents/DvTitles'
import DvForm from '../styleComponents/Tabs'
import DvButton from '../styleComponents/DvButton'
import confirm from '../decorators/confirm'
import VerificationForm from './forms/VerificationForm'

class SignUp extends Component {

    render() {
        const { confirm, confirmAccount } = this.props;

        return (
            <div>
                <HeaderIntro/>
                <DvGrid width="1560px">
                    <DvTitle mTop="126">
                        Account Verification
                    </DvTitle>
                    <DvForm>
                        <div style={{marginTop: '50px'}}>
                            <VerificationForm/>
                        </div>
                    </DvForm>
                    <DvButton onClick={confirmAccount} primary content='SAVE & CONTINUE'/>
                    { confirm && this.getUserRedirect() }
                </DvGrid>
            </div>
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