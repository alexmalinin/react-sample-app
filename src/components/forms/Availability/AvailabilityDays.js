import React, {Component} from 'react';
import { Field } from 'redux-form';
import { renderField } from '../renders/RenderField';
import { daysAvailable } from '../../../helpers/selects/daysAvailable';
import RenderCheckbox from '../renders/RenderCheckbox';

class   AvailabilityDays extends Component  {

    render() {
        return (
            <div className='checkbox-group'>
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

