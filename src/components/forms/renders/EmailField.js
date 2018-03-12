import React from 'react';
import { Field } from 'redux-form';
import { required, email } from '../../../helpers/validate';
import {RenderField} from './RenderField';

import StyledInputs from '../../../styleComponents/forms/StyledInputs';

const EmailField = props => {
    const { name, placeholder, disabled, label } = props;

    return (
        <StyledInputs>
            <label htmlFor={name}>{label}</label>
            <Field
                name={name}
                type="email"
                placeholder={placeholder}
                component={RenderField}
                validate={[required, email]}
                disabled={disabled}
            />
        </StyledInputs>
    )
};

export default EmailField