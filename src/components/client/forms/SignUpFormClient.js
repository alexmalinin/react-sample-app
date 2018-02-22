import React, { Component } from 'react';
import { Field, reduxForm, stopSubmit } from 'redux-form';
import RenderSelect from '../../forms/renders/RenderSelect';
import { required } from '../../../helpers/validate';
import { employeers } from '../../../helpers/selects/employeers';
import SignUpForm from '../../SignUp/SignUpForm';
import InputField from '../../forms/renders/InputField'

let renderErrror = true;

class SignUpFormClient extends Component {

    render() {


        return (
            <SignUpForm {...this.props}>
            </SignUpForm>
        )
    };

    componentWillReceiveProps(nextState) {
        if (renderErrror) {
            if (nextState.failLogin) {
                renderErrror = false;
                this.props.dispatch(stopSubmit('SignUpFormClient', {'email': 'Email has already been taken' }))
            }
        }
    }
}

export default reduxForm({
    form: 'SignUpFormClient',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(SignUpFormClient);
