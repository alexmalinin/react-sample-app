import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RenderField from '../forms/renders/RenderField';
import StyledVerificationForm from '../../styleComponents/StyledVerificationForm';
import { DvButton } from '../../styleComponents/layout/DvButton';

const validate = values => {
    const errors = {};
    if (!values.password) {
        errors.password = 'Required';
    }

    if (values.password ? values.password.length < 8 : false) {
        errors.password = 'Minimum length 8 digits';
    }

    if (!values.password_confirmation) {
        errors.password_confirmation = 'Required';
    }

    if (values.password !== values.password_confirmation) {
        errors.password_confirmation = 'Passwords do not match.';
    }

    return errors;
};

const VerificationForm = props => {
    const { handleSubmit, submitting } = props;

    return (
        <StyledVerificationForm onSubmit={handleSubmit}>
            <Field
                component={RenderField}
                name='password'
                placeholder='Password /'
                type='password'

            />
            <Field
                component={RenderField}
                name='password_confirmation'
                placeholder='Confirm password /'
                type='password'
            />
            <DvButton indentTop className='verify-btn width200'
                /*onClick={confirmAccount}*/
                      onClick={this.postRequest}
                      primary
                      type='submit'
                      disabled={submitting}
                      content='SAVE & CONTINUE'
            />
        </StyledVerificationForm>
    )
};

export default reduxForm({
    form: 'VerificationForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate,
})(VerificationForm)
