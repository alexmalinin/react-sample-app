import React from 'react';
import RenderSelect from './RenderSelect';
import { Field, reduxForm } from 'redux-form';
import { RenderField } from './RenderField';
import { required } from '../../../helpers/validate';
import { phoneCodes } from '../../../helpers/selects/phoneCodes'

const RenderPhone = ({hasPerson, value}) =>
        <div className='phone-wrapper'>
            <Field
                name='phone_code'
                component={RenderSelect}
                placeholder={value ? value : '+61'}
                options={phoneCodes}
                validate={[required]}
            />
            <Field
                name='phone_number'
                component={RenderField}
                type='number'
                placeholder=''
                validate={[required]}
            />
        </div>
;

export default RenderPhone;
