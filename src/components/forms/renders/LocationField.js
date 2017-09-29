import React from 'react';
import { required } from '../../../helpers/validate';
import InputField from './InputField'

const LocationField = props => {
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