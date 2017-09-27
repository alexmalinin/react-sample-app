import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required, minLength2, email } from '../../../helpers/validate';
import {RenderField} from './RenderField';
import DvButton from '../../../styleComponents/DvButton'

const EmailField = props => {
    const { name, placeholder, disabled } = props;

    return (
        <Field
            name={name}
            type="email"
            placeholder={placeholder}
            component={RenderField}
            validate={[required, email]}
            disabled={disabled}
        />
    )
}

export default EmailField