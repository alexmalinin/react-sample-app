import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import HeaderIntro from '../layout/HeaderIntro';
import {DvTitle} from '../../styleComponents/layout/DvTitles';
import DvForm from '../../styleComponents/Tabs';
import { DvButton } from '../../styleComponents/layout/DvButton';
import confirm from '../../decorators/confirm';
import VerificationForm from './VerificationForm';
import { Container } from '../../styleComponents/layout/Container';

class Verification extends Component {

    componentWillMount() {
        this.user = window.location.pathname.match(/\w+/g)[2];
    }

    render() {
        const { confirm, confirmAccount } = this.props;
        return (
            <main>
                <HeaderIntro/>
                <Container indentBot>
                    <DvTitle mTop='126'>
                        Account Verification
                    </DvTitle>
                    <DvForm widthAuto>
                        <VerificationForm/>
                    </DvForm>
                    <DvButton className='verify-btn' onClick={confirmAccount} primary content='SAVE & CONTINUE'/>
                    <DvButton className='verify-btn'  primary content='SAVE & CONTINUE'/>
                    { confirm && this.getUserRedirect() }
                </Container>
            </main>
        )
    }

    getUserRedirect(){
        const { changeUserType, user } = this.props;

        return(
            <div>
                {this.user === 'specialists' ?
                    <Redirect to="/specialists/dashboard/welcome-to-the-village-1"/> :
                    <Redirect to="/client/dashboard/welcome-to-the-village"/>
                }
            </div>
        )
    }
}

export default connect(({changeUserType}) => ({changeUserType}))(confirm(Verification));