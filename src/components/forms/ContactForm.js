import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required, minLength2, email } from '../../helpers/validate';
import DvButton from '../../styleComponents/DvButton'
import InputField from './InputField';
import EmailField from './EmailField';

const ContactForm = props => {
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
            <EmailField
                name="email"
                placeholder="Email"
            />
            <Field name="message" component="textarea" validate={required}/>
            <DvButton
                type="submit"
                disabled={submitting}
                content='Continue'
                primary
            />
        </form>
    )
}

export default reduxForm({
    form: 'ContactForm' // a unique identifier for this form
})(ContactForm)