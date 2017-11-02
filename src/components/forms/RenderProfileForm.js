import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {required} from '../../helpers/validate';
import { DvButton } from '../../styleComponents/layout/DvButton'
import InputField from './renders/InputField';
import {RenderField} from './renders/RenderField';
import EmailField from './renders/EmailField';
import StyledPhoneField from '../../styleComponents/forms/StyledPhoneField';
import RenderPhone from './renders/RenderPhone';

const RenderProfileForm = props => {
    const {handleSubmit, submitting} = props;
    return (
        <form onSubmit={handleSubmit}>
            <InputField
                name="first_name"
                placeholder="First Name /"
            />

            <InputField
                name="last_name"
                placeholder="Last Name /"
            />

            <InputField
                name="country"
                placeholder="Country /"
            />

            <StyledPhoneField>
                <span>Phone /</span>
                <RenderPhone/>
            </StyledPhoneField>

            <EmailField
                name="email"
                placeholder="Email /"
            />

            <Field
                component={RenderField}
                name="password"
                placeholder="Password /"
                type="password"
                validate={[required]}
            />

            <DvButton large
                type="submit"
                disabled={submitting}
                content='SAVE & UPDATE'
                primary
            />
        </form>
    )
};

export default reduxForm({
    form: 'RenderProfileForm'
})(RenderProfileForm)
