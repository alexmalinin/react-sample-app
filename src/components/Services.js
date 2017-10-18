import React, {Component} from 'react';
import { Field } from 'redux-form';
import {renderField} from './forms/renders/RenderField';
import {daysAvailable} from '../helpers/selects/daysAvailable';
import RenderCheckbox from './forms/renders/RenderCheckbox';
import {DropdownAvailability} from '../styleComponents/StyledDropdown';
import SlideTogle from './SlideTogle';

class Services extends Component  {

    render() {
        return (
            <div>
                <DropdownAvailability>
                    <SlideTogle height={'auto'}>
                        <p>Web development /</p>
                        <p>checkBox-1</p>
                        <p>checkBox-1</p>
                    </SlideTogle>
                </DropdownAvailability>
                <DropdownAvailability>
                    <SlideTogle height={'auto'}>
                        <p>Web design /</p>
                        <p>checkBox-1</p>
                        <p>checkBox-1</p>
                    </SlideTogle>
                </DropdownAvailability>
                <DropdownAvailability>
                    <SlideTogle height={'auto'}>
                        <p>Application design /</p>
                        <p>checkBox-1</p>
                        <p>checkBox-1</p>
                    </SlideTogle>
                </DropdownAvailability>
            </div>
        )
    }
}

export default Services;
