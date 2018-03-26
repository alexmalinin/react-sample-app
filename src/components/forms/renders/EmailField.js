import React from 'react';
import { Field } from 'redux-form';
import { required, email } from '../../../helpers/validate';
import RenderField from './RenderField';

const EmailField = props => {
    const { name, placeholder, disabled, label, data, handleFormField } = props;

    return (
        <div>
            <Field
                name={name}
                type="email"
                placeholder={placeholder}
                label={label}
                component={RenderField}
                validate={[required, email]}
                disabled={disabled}
                handleFormField={handleFormField}
                data={data}
            />
        </div>
    )
};

export default EmailField