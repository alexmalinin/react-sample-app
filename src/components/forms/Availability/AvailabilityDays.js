import React, {Component} from 'react';
import { Field } from 'redux-form';
import {renderField} from '../renders/RenderField';
import { Route, Redirect } from 'react-router';
import {daysAvailable} from '../../../helpers/selects/daysAvailable';
import RenderRadio from '../renders/RenderRadio';

class AvailabilityDays extends Component  {

    render() {
        return (
            <div className='checkbox-group'>
                {daysAvailable
                    ? daysAvailable.map(item =>
                        <Field
                            key={item}
                            name={`days.${item}`}
                            component={RenderRadio}
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
