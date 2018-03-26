import React from 'react';
import RenderSelect from './RenderSelect';
import { Field } from 'redux-form';
import RenderField from './RenderField';
import { required } from '../../../helpers/validate';
import { phoneCodes } from '../../../helpers/selects/phoneCodes'

const RenderPhone = ({hasPerson, value, handleFormField}) => {
        return (
            <div className='phone-wrapper'>
                <Field
                    name='phone_code'
                    component={RenderSelect}
                    placeholder=''
                    options={phoneCodes}
                    value={value}
                />
                <Field
                    name='phone_number'
                    component={RenderField}
                    type='number'
                    placeholder=''
                    handleFormField={handleFormField}
                />
            </div>            
        )
    }
;

export default RenderPhone;
