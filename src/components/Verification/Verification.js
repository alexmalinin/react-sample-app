import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import HeaderIntro from '../layout/HeaderIntro';
import {DvTitle} from '../../styleComponents/layout/DvTitles';
import DvForm from '../../styleComponents/Tabs';
import confirm from '../../decorators/confirm';
import VerificationForm from './VerificationForm';
import { Container } from '../../styleComponents/layout/Container';
import { verifyPassword, getUserId, userType, deleteConfirmationToken} from '../../actions/actions';

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
                <Container>
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
    }

    submit = values => {
        const {UserId , verifyPassword } = this.props;
        localStorage.setItem('userId', UserId);
        verifyPassword(this.user + 's', UserId, values);
    };

    componentWillUnmount() {
        this.props.deleteConfirmationToken(this.user, this.token);
    }

}

export default connect(({UserId, confirmPassword}) => ({UserId, confirmPassword}),
    {
        verifyPassword,
        getUserId,
        userType,
        deleteConfirmationToken,
    })(confirm(Verification));