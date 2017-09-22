import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required, minLength2, email } from '../../helpers/validate';
import {renderField} from '../renderField';
import DvButton from '../../styleComponents/DvButton'

const EmailField = props => {
    const { name, placeholder } = props;

    return (
        <Field
            name={name}
            type="email"
            placeholder={placeholder}
            component={renderField}
            validate={[required, email]}
        />
    )
}

export default EmailField