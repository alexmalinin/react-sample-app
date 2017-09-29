import React from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import {renderField} from './renders/RenderField';
import DvButtonForm from '../../styleComponents/DvButtonForm'
import InputField from './renders/InputField'

const SignInForm = props => {
    const { handleSubmit, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            <InputField
                name="first_name"
                placeholder="First Name"
                type
            />
            <InputField
                name="last_name"
                placeholder="Last Name"
            />

            <Link to="/forgot_password">I've forgotten</Link>

            <DvButtonForm
                type="submit"
                disabled={submitting}
                content='Login'
                primary
            />
        </form>
    )
}

export default reduxForm({
    form: 'SignInForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(SignInForm)