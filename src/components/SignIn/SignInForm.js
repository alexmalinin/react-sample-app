import React from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { renderField } from '../forms/renders/RenderField';
import DvButtonForm from '../../styleComponents/layout/DvButtonForm'
import StyledFormHint from '../../styleComponents/forms/StyledFormHint';
import InputField from '../forms/renders/InputField'

const SignInForm = props => {
    const { handleSubmit, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            <InputField
                name="first_name"
                placeholder="First Name /"
                type
            />
            <InputField
                name="last_name"
                placeholder="Last Name /"
            />
            <StyledFormHint>
                <Link to="/forgot_password">I've forgotten</Link>
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

export default reduxForm({
    form: 'SignInForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(SignInForm)