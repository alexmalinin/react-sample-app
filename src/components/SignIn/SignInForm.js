import React, { Component } from 'react';
import { reduxForm, Field, change, stopSubmit } from 'redux-form';
import { Link } from 'react-router-dom';
import { required, minLength8, email } from '../../helpers/validate';
import { RenderField } from '../forms/renders/RenderField';
import DvButtonForm from '../../styleComponents/layout/DvButtonForm'
import StyledFormHint from '../../styleComponents/forms/StyledFormHint';
import InputField from '../forms/renders/InputField'
import EmailField from '../forms/renders/EmailField';

class SignInForm extends Component {

    componentWillMount() {
        let { email } = this.props;
        if (email) {
            this.props.dispatch(change('SignInForm', 'email', email ))
        }
    }

    render() {
        const { handleSubmit, submitting } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <EmailField
                    name="email"
                    placeholder="Email /"
                />
                <Field
                    component={RenderField}
                    name="password"
                    placeholder="Password /"
                    type="password"
                    validate={[required, minLength8]}
                />
                <StyledFormHint>
                    <Link to="/forgot_password">I've forgotten password</Link>
                </StyledFormHint>

                <DvButtonForm
                    type="submit"
                    disabled={submitting}
                    content='Login'
                    primary
                />
            </form>
        )
    };

    componentWillReceiveProps(nextState) {
        if (nextState.failSignIn) {
            this.props.dispatch(stopSubmit("SignInForm", {"email": 'Don\'t exist this email', "password": 'Check your password again'} ));
        }
    }
}

export default reduxForm({
    form: 'SignInForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(SignInForm)