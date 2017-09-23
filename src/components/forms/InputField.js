import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required, minLength2, email } from '../../helpers/validate';
import {RenderField} from './RenderField';

const InputField = props => {
    const { name, placeholder } = props;

    return (
        <Field
            name={name}
            type="text"
            placeholder={placeholder}
            component={RenderField}
            validate={[required, minLength2]}
        />
    )
}

export default InputField