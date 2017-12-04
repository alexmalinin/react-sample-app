import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderIntro from './layout/HeaderIntro';
import {DvTitle} from '../styleComponents/layout/DvTitles';
import confirm from '../decorators/confirm';
import { Container } from '../styleComponents/layout/Container';
import { resetSignUpData } from "../actions/actions";

class ConfirmEmail extends Component {

    render() {
        const { signUpData } = this.props;

        return (
            <main>
                <HeaderIntro/>
                <Container indentBot>
                    <DvTitle mTop='126'>
                        Confirmation
                    </DvTitle>
                    <p>Please confirm your email: <b>{signUpData ? signUpData.email : localStorage.getItem('user_email')}</b></p>
                </Container>
            </main>
        )
    }

    componentDidMount() {
        this.props.resetSignUpData();
    }
}

export default connect(({signUpData}) => ({signUpData}), {resetSignUpData})(confirm(ConfirmEmail));