import React, { Component } from 'react';
import { reduxForm, Field, change, stopSubmit } from 'redux-form';
import { Link } from 'react-router-dom';
import { required, minLength8 } from '../../helpers/validate';
import { RenderField } from '../forms/renders/RenderField';
import DvButtonForm from '../../styleComponents/layout/DvButtonForm'
import StyledFormHint from '../../styleComponents/forms/StyledFormHint';
import EmailField from '../forms/renders/EmailField';

class ForgotPasswordForm extends Component {

    // componentWillMount() {
    //     let { email } = this.props;
    //     if (email) {
    //         this.props.dispatch(change('SignInForm', 'email', email ))
    //     }
    // }

    render() {
        const { handleSubmit, submitting } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <EmailField
                    name='email'
                    placeholder='Email /'
                />

                <DvButtonForm passwordForm
                    type='submit'
                    disabled={submitting}
                    content='Submit'
                    primary
                />
            </form>
        )
    };

    // componentWillReceiveProps(nextState) {
    //     console.log(nextState);
    //     if (nextState.failSignIn) {
    //         this.props.dispatch(stopSubmit("SignInForm", {"email": 'Don\'t exist this email', "password": 'Check your password again'} ));
    //     }
    // }
}

export default reduxForm({
    form: 'ForgotPasswordForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(ForgotPasswordForm)