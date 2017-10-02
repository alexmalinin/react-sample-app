import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import {renderField} from './renders/RenderField';
import { Route, Redirect } from 'react-router';
import RenderRadio from './renders/RenderRadio';

class AvailabilityForm extends Component  {

    render() {
        const { handleSubmit, submitting, person, changeUserType, hasPerson } = this.props;
        return (
            <div>
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

export default AvailabilityForm;