import React from 'react';
import { Field } from 'redux-form';
import { required, minLength2 } from '../../../helpers/validate';
import {RenderField} from './RenderField';
import Divider from 'semantic-ui-react';
import StyledInputs from '../../../styleComponents/forms/StyledInputs';

const InputField = props => {
    const { name, placeholder, disabled, validate, label } = props;


    return (
        <StyledInputs>
            <label htmlFor={name}>{label}</label>
            <Field
                name={name}
                type='text'
                placeholder={placeholder}
                component={RenderField}
                disabled={disabled}
                validate={validate ? [required, minLength2] : []}
            />
        </StyledInputs>
    )
};

export default InputField