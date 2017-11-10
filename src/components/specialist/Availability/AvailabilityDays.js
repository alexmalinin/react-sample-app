import React, {Component} from 'react';
import { Field } from 'redux-form';
import { daysAvailable } from '../../../helpers/selects/daysAvailable';
import RenderCircleCheckbox from '../../forms/renders/RenderCircleCheckbox';

class  AvailabilityDays extends Component  {

    render() {
        return (
            <div className='checkbox-group'>
                {daysAvailable
                    ? daysAvailable.map(item =>
                        <Field
                            key={item}
                            name={`days.${item}`}
                            component={RenderCircleCheckbox}
                            type="checkbox"
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

