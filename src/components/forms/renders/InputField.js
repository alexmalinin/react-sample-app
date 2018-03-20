import React from 'react';
import { Field } from 'redux-form';
import { required, minLength2 } from '../../../helpers/validate';
import {RenderField} from './RenderField';
import Divider from 'semantic-ui-react';
import StyledInputs from '../../../styleComponents/forms/StyledInputs';

const InputField = props => {
    const { name, placeholder, disabled, validate, label, ...rest } = props;


    return (
        <div>
            <Field
                name={name}
                type='text'
                placeholder={placeholder}
                label={label}
                component={RenderField}
                disabled={disabled}
                {...rest}
                validate={validate ? [required, minLength2] : []}
            />
        </div>
    )
};

export default InputField