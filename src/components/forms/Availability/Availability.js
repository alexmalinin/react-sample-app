import React, {Component} from 'react';
import AvailabilityTime from './AvailabilityTime';
import AvailabilityDays from './AvailabilityDays';
import AnimateHeight from 'react-animate-height';
import { DvButton } from '../../../styleComponents/DvButton';
import { DropdownAvailability} from '../../../styleComponents/StyledDropdown';
import StyledAvailabilityForm from '../../../styleComponents/StyledAvailabilityForm';


class Availability extends Component {

    state = {
        heightDays: '0',
        heightTime: '0',
    };

    render() {
        let { heightDays, heightTime  } = this.state;
        let { submitting, submitBtn  } = this.props;

        return (
            <StyledAvailabilityForm>
                <p>
                    <b>Set your availability</b> / This can be easily changed at anytime
                </p>

                <DropdownAvailability>
                    <p onClick={this.handleHeight('time')}>Full-time / Part-time / Not available</p>
                    <AnimateHeight
                        duration={500}
                        height={heightTime}
                    >

                        <AvailabilityTime/>

                    </AnimateHeight>
                </DropdownAvailability>

                <DropdownAvailability>
                    <p onClick={this.handleHeight('days')}>Days available</p>

                    <AnimateHeight
                        duration={500}
                        height={heightDays}
                    >

                        <AvailabilityDays/>

                    </AnimateHeight>
                </DropdownAvailability>
                {submitBtn ? <DvButton
                    type="submit"
                    disabled={submitting}
                    content='SAVE & UPDATE'
                    primary
                    /> : null }
            </StyledAvailabilityForm>
        )
    }

    handleHeight = arg => ev => {
        let { heightDays, heightTime } = this.state;
        if (arg === 'days') {
            heightDays === 'auto'
                ? this.setState({
                    heightDays: '0',
                })
                : this.setState({
                    heightDays: 'auto',
                })
        } else {
            heightTime === 'auto'
                ? this.setState({
                    heightTime: '0',
                })
                : this.setState({
                    heightTime: 'auto',
                })
        }
    }
}

export default Availability;
