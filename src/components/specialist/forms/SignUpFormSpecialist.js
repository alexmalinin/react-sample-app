import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, stopSubmit } from 'redux-form';
import RenderSignUpRadio from '../../forms/renders/RenderSignUpRadio';
import SignUpForm from '../../SignUp/SignUpForm';
import { formValueSelector } from 'redux-form';

let renderErrror = true;

class SignUpFormSpecialist extends Component  {

    render() {
        return (
            <SignUpForm {...this.props}>
            </SignUpForm>
        )
    }

    componentWillReceiveProps(nextState) {
        if (renderErrror) {
            if (nextState.failLogin) {
                renderErrror = false;
                this.props.dispatch(stopSubmit('SignUpFormSpecialist', {'email': 'Email has already been taken' }))
            }
        }
    }
}


SignUpFormSpecialist = reduxForm({
    form: 'SignUpFormSpecialist',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(SignUpFormSpecialist);

export default SignUpFormSpecialist;

