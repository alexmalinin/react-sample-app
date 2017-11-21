import React, {Component} from 'react';
import AvailabilityTime from './AvailabilityTime';
import AvailabilityDays from './AvailabilityDays';
import { DvButton } from '../../../styleComponents/layout/DvButton';
import { DropdownAvailability, Days } from '../../../styleComponents/StyledDropdown';
import StyledAvailabilityForm from '../../../styleComponents/StyledAvailabilityForm';
import { Field } from 'redux-form';
import RenderSelect from '../../forms/renders/RenderSelect';
import {workHourses} from '../../../helpers/selects/workHourses';
import { required, } from '../../../helpers/validate';
import SlideTogle from '../../SlideTogle';


class Availability extends Component {

    render() {

        let { submitting, submitBtn, specialistData } = this.props;
        let { successId } = specialistData || false;
        console.log(successId)

        return (
            <StyledAvailabilityForm>
                <p>
                    <b>Set your availability</b> / This can be easily changed at anytime
                </p>
                <DropdownAvailability>
                    <SlideTogle rerender={successId} height={0}>
                        <p>Full-time / Part-time / Not available</p>
                        <AvailabilityTime/>
                    </SlideTogle>
                </DropdownAvailability>

                <DropdownAvailability customPadd>
                    <SlideTogle rerender={successId} height={0}>
                        <p>Days available</p>
                        <AvailabilityDays/>
                    </SlideTogle>
                </DropdownAvailability>

                <Field
                    name='hours_per_week'
                    component={RenderSelect}
                    placeholder='Hours per week'
                    options={workHourses}
                    validate={[required]}
                />
                {submitBtn ? <DvButton
                    type='submit'
                    disabled={submitting}
                    content='SAVE & UPDATE'
                    primary
                    /> : null }
            </StyledAvailabilityForm>
        )
    }
}

export default Availability;

