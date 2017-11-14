import React, {Component} from 'react';
import { reduxForm, stopSubmit } from 'redux-form';
import SignUpForm from '../../SignUp/SignUpForm';

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

