import React from 'react';
import { Field } from 'redux-form';
import { required, email } from '../../../helpers/validate';
import {RenderField} from './RenderField';

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
};

export default EmailField