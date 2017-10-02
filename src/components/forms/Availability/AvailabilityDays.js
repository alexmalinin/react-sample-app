import React, {Component} from 'react';
import { Field } from 'redux-form';
import {renderField} from '../renders/RenderField';
import { Route, Redirect } from 'react-router';
import {daysAvailable} from '../../../helpers/daysAvailable';
import RenderCheckbox from '../renders/RenderCheckbox'

class AvailabilityDays extends Component  {

    render() {
        return (
            <div>
                {daysAvailable
                    ? daysAvailable.map(item =>
                        <Field
                            key={item}
                            name={`days.${item}`}
                            component={RenderCheckbox}
                            label={item}
                            value={item}
                        />)
                    : null
                }
            </div>
        )
    }
}

export default AvailabilityDays;