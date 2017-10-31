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
import {verifyPassword, getUserId} from '../../actions/actions'

class Verification extends Component {

    componentWillMount() {
        let { match } = this.props;
        this.token = match.params.token;
        this.user = match.params.user;
        this.props.getUserId(this.user, this.token);
    }

    render() {
        const { confirm, confirmAccount, confirmPassword } = this.props;
        return (
            <main>
                <HeaderIntro/>
                <Container indentBot>
                    <DvTitle mTop='126'>
                        Account Verification
                    </DvTitle>
                    <DvForm widthAuto>
                        <VerificationForm onSubmit={this.submit}/>
                    </DvForm>
                    { confirmPassword && this.getUserRedirect() }
                </Container>
            </main>
        )
    }

    // postRequest = ev => {
    //     // this.props.verifyPassword(this.user, )
    // };

    getUserRedirect(){
        const { changeUserType, user } = this.props;
        let redirect;
        if (this.user === 'customer') {
            redirect = <Redirect to="/client/dashboard/welcome-to-the-village"/>
        } else if (this.user === 'specialists'){
            redirect = <Redirect to="/specialists/dashboard/welcome-to-the-village-1"/>
        }

        return(
            <div>
                {this.user ? redirect : null}
            </div>
        )
    }

    submit = values => {
        const {UserId , verifyPassword } = this.props;
        verifyPassword(this.user + 's', UserId, values);
    };
}

export default connect(({UserId, confirmPassword}) => ({UserId, confirmPassword}),
    {
        verifyPassword,
        getUserId,
    })(confirm(Verification));