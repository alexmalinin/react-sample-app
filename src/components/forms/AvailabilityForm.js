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
                <p>Full-time / Part-time / Not available</p>
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
            </div>
        )
    }
}

export default AvailabilityForm;