import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {RenderField} from '../forms/renders/RenderField';
import StyledVerificationForm from '../../styleComponents/StyledVerificationForm'

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
                name="confirm_password"
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
})(VerificationForm)
