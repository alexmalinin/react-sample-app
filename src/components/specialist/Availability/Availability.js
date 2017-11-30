import React, {Component} from 'react';
import AvailabilityTime from './AvailabilityTime';
import AvailabilityDays from './AvailabilityDays';
import AvailabilityHours from './AvailabilityHours';
import { DvButton } from '../../../styleComponents/layout/DvButton';
import { DropdownAvailability, Days } from '../../../styleComponents/StyledDropdown';
import StyledAvailabilityForm from '../../../styleComponents/StyledAvailabilityForm';
import RenderRadio from '../../forms/renders/RenderRadio';


import SlideTogle from '../../SlideTogle';
import Field from "redux-form/es/Field";


class Availability extends Component {

    render() {

        let { submitting, submitBtn, specialistData } = this.props;
        let { successId } = specialistData || false;

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

                <DropdownAvailability customPadd>
                    <SlideTogle rerender={successId} height={0}>
                        <p>Hours per week</p>
                        <AvailabilityHours/>
                    </SlideTogle>
                </DropdownAvailability>

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

