import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required, minLength2, email } from '../../helpers/validate';
import {renderField} from '../renderField';
import DvButtonForm from '../../styleComponents/DvButtonForm'
import InputField from './InputField'

const SignInForm = props => {
    const { handleSubmit, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            <InputField
                name="first_name"
                placeholder="First Name"
            />
            <InputField
                name="last_name"
                placeholder="Last Name"
            />
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
    form: 'SignInForm' // a unique identifier for this form
})(SignInForm)