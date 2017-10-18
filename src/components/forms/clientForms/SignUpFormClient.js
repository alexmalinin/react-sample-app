import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RenderSelect from '../renders/RenderSelect';
import { employeers } from '../../../helpers/selects/employeers';
import SignUpForm from '../SignUpForm';
import InputField from '../renders/InputField'

const SignUpFormClient = props =>  {

    return (
        <SignUpForm {...props}>
            <InputField
                name="company_name"
                placeholder="Company name /"
                noValidate={true}
            />
            <Field
                name="company-employeers"
                component={RenderSelect}
                placeholder="Number of employeers /"
                options={employeers}
            />
        </SignUpForm>
    )
};


export default reduxForm({
    form: 'SignUpFormClient',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(SignUpFormClient);
