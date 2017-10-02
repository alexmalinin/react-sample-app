import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {RenderField} from './renders/RenderField';

const VerificationForm = props => {
    const { handleSubmit } = props;
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Field
                    component={RenderField}
                    name="password"
                    placeholder="Password"
                    type="password"
                />
                <Field
                    component={RenderField}
                    name="confirm_password"
                    placeholder="Confirm password"
                    type="password"
                />
            </form>
        </div>
    )
}

export default reduxForm({
    form: 'VerificationForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(VerificationForm)