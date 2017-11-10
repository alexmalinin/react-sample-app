import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RenderSelect from '../../forms/renders/RenderSelect';
import { required } from '../../../helpers/validate';
import { employeers } from '../../../helpers/selects/employeers';
import SignUpForm from '../../SignUp/SignUpForm';
import InputField from '../../forms/renders/InputField'

const SignUpFormClient = props =>  {

    return (
        <SignUpForm {...props}>
            <InputField
                name="company_name"
                placeholder="Company name /"
                validate={[required]}
            />
            <Field
                name="employers_number"
                component={RenderSelect}
                placeholder="Number of employeers /"
                options={employeers}
                validate={[required]}
            />
        </SignUpForm>
    )
};


export default reduxForm({
    form: 'SignUpFormClient',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(SignUpFormClient);
