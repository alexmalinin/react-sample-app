import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required, minLength2, email } from '../../../helpers/validate';
import {RenderField} from './RenderField';
import InputField from './InputField'

const LocationField = props => {
    const { name, placeholder, disabled, type } = props;

    return (
        <div>
            <InputField
                name="country"
                placeholder="Country /"
                validate={[required]}
            />
            <InputField
                name="city"
                placeholder="City /"
                validate={[required]}
            />
        </div>
    )
}

export default LocationField