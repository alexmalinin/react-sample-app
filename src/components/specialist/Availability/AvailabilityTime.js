import React, {Component} from 'react';
import { Field } from 'redux-form';
import {renderField} from '../../forms/renders/RenderField';
import { Route, Redirect } from 'react-router';
import RenderRadio from '../../forms/renders/RenderRadio';

class AvailabilityTime extends Component  {

    render() {
        return (
            <div className='checkbox-group'>
                <Field name="availability"
                       component={RenderRadio}
                       type="radio"
                       label="Full Time"
                       value="Full Time"
                />
                <Field name="availability"
                       component={RenderRadio}
                       type="radio"
                       label="Part Time"
                       value="Part Time"
                />
                <Field name="availability"
                       component={RenderRadio}
                       type="radio"
                       label="Not available"
                       value="Not available"
                />
            </div>
        )
    }
}

export default AvailabilityTime;