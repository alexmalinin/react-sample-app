import React from 'react';
import RenderSelect from './RenderSelect';
import { Field, reduxForm } from 'redux-form';
import { RenderField } from './RenderField';
import { required } from '../../../helpers/validate';
import { phoneCodes } from '../../../helpers/selects/phoneCodes'

const RenderPhone = ({hasPerson,}) =>
        <div className='phone-wrapper'>
            <Field
                name='phone-select'
                component={RenderSelect}
                placeholder='+61'
                options={phoneCodes}
                validate={[required]}
            />
            <Field
                name='phone-input'
                component={RenderField}
                type='number'
                placeholder=''
                validate={[required]}
            />
        </div>
;

export default RenderPhone;
