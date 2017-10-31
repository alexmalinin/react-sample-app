import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {RenderField} from '../forms/renders/RenderField';
import StyledVerificationForm from '../../styleComponents/StyledVerificationForm'

const validate = values => {
    const errors = {}
    if (!values.password) {
        errors.password = 'Required';
        // return (field, fields) => fields.password.value !== fields.passwordConfirm.value && 'Passwords do not match.'
    }
    return errors;
}

const VerificationForm = props => {
    const { handleSubmit } = props;

    return (
        <StyledVerificationForm onSubmit={handleSubmit}>
            <Field
                component={RenderField}
                name="password"
                placeholder="Password /"
                type="password"

            />
            <Field
                component={RenderField}
                name="password_confirmation"
                placeholder="Confirm password /"
                type="password"
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
