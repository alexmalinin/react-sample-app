import React, {Component} from 'react';
import AvailabilityTime from './AvailabilityTime';
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
                <DropdownAvailability>
                    <SlideTogle rerender={successId} height={0}>
                        <p>Availability</p>
                        <AvailabilityTime/>
                    </SlideTogle>
                </DropdownAvailability>

            </StyledAvailabilityForm>
        )
    }
}

export default Availability;

