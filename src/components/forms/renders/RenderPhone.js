import React from 'react';
import RenderSelect from './RenderSelect';
import { Field, reduxForm } from 'redux-form';
import { RenderField } from './RenderField';
import { required } from '../../../helpers/validate';
import { phoneCodes } from '../../../helpers/phoneCodes'

const RenderPhone = ({hasPerson,}) =>
        <div>
            <Field
                name="phone-select"
                component={RenderSelect}
                placeholder="+61"
                options={phoneCodes}
                disabled={hasPerson === 'Agency'}
                validate={[required]}
            />
            <Field
                name="phone-input"
                component={RenderField}
                type="number"
                placeholder=""
                disabled={hasPerson === 'Agency'}
                validate={[required]}
            />
        </div>
;

export default RenderPhone;