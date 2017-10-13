import React from 'react';
import { Field } from 'redux-form';
import { required, minLength2 } from '../../../helpers/validate';
import {RenderField} from './RenderField';

const InputField = props => {
    const { name, placeholder, disabled, noValidate } = props;

    return (
        <Field
            name={name}
            type='text'
            placeholder={placeholder}
            component={RenderField}
            disabled={disabled}
            validate={noValidate ? false : [required, minLength2]}
        />
    )
};

export default InputField