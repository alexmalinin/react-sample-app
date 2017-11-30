import React, {Component} from 'react';
import { Field } from 'redux-form';
import RenderRadio from '../../forms/renders/RenderRadio';
import { workHourses } from '../../../helpers/selects/workHourses';

class AvailabilityHours extends Component  {

    render() {
        return (
            <div className='checkbox-group'>
                { workHourses ? workHourses.map( item =>
                        <Field name='hours_per_week'
                               key={item}
                               component={RenderRadio}
                               type='radio'
                               label={item}
                               value={item}
                        />
                    ) : null
                }
            </div>
        )
    }
}

export default AvailabilityHours;