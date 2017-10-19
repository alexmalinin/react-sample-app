import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required } from '../../helpers/validate';
import { DvButton } from '../../styleComponents/layout/DvButton';
import InputField from '../forms/renders/InputField';
import EmailField from '../forms/renders/EmailField';
import RenderTextArea from '../forms/renders/RenderTextArea';

const ContactForm = props => {
    const { handleSubmit, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            <InputField
                name='first_name'
                placeholder='First Name /'
            />
            <InputField
                name='last_name'
                placeholder='Last Name /'
            />
            <EmailField
                name='email'
                placeholder='Email /'
            />

            <div className='text-area-group'>
                <p>Massage /</p>
                <Field name='message' component={RenderTextArea} validate={required}/>
            </div>
            <DvButton
                type='submit'
                disabled={submitting}
                content='Continue'
                primary
            />
        </form>
    )
};

export default reduxForm({
    form: 'ContactForm'
})(ContactForm)
