import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import HeaderIntro from '../layout/HeaderIntro';
import {DvTitle} from '../../styleComponents/layout/DvTitles';
import DvForm from '../../styleComponents/Tabs';
import confirm from '../../decorators/confirm';
import VerificationForm from '../Verification/VerificationForm';
import { Container } from '../../styleComponents/layout/Container';
import { getPasswordsForResetPassword, userType, deleteConfirmationToken} from '../../actions/actions';

class ResetPage extends Component {

    componentWillMount() {
        let { match } = this.props;
        this.token = match.params.token;
        this.user = match.params.user;
    }

    render() {
        const { confirm, confirmAccount, signInReducer } = this.props;
        console.log('signInReducer', signInReducer)
        return (
            <main>
                <HeaderIntro/>
                <Container>
                    <DvTitle mTop='126'>
                        Reset Password
                    </DvTitle>
                    <DvForm widthAuto>
                        <VerificationForm onSubmit={this.submit}/>
                    </DvForm>
                    { signInReducer && this.getUserRedirect() }
                </Container>
            </main>
        )
    }

    componentDidMount() {
        let tab = this.user === 'customer' ? 'Client' : 'Specialist';
        this.props.userType(tab);
    }

    getUserRedirect = () => {
        return(
            <div>
                <Redirect to="/sign_in"/>
            </div>
        )
    };

    submit = passwords => {
        // localStorage.setItem('userId', UserId);
        this.props.getPasswordsForResetPassword(passwords, this.user, this.token);
    };

    componentWillUnmount() {
        // this.props.deleteConfirmationToken(this.user, this.token);
    }

}

export default connect(({ signInReducer }) => ({ signInReducer }),
    {
        userType,
        deleteConfirmationToken,
        getPasswordsForResetPassword,
    })(confirm(ResetPage));