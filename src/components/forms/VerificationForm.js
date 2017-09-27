import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { required, minLength2, email } from '../../helpers/validate';
import {RenderField} from './renders/RenderField';
import DvButtonForm from '../../styleComponents/DvButtonForm'
import InputField from './renders/InputField'

const VerificationForm = props => {
    const { handleSubmit, submitting } = props;
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