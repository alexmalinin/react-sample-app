import React, {Component} from 'react';
import { Field } from 'redux-form';
import {renderField} from '../forms/renders/RenderField';
import {daysAvailable} from '../../helpers/selects/daysAvailable';
import RenderCheckbox from '../forms/renders/RenderCheckbox';
import {DropdownAvailability} from '../../styleComponents/StyledDropdown';
import SlideTogle from '../SlideTogle';
import WebDevelopment from './forms/WebDevelopment';
import WebDesign from './forms/WebDesign';
import ApplicationDesign from './forms/ApplicationDesign';
import DetailsSelects from './forms/DetailsSelects'

class Services extends Component  {

    render() {
        return (
            <div>
                <DetailsSelects/>
            </div>
        )
    }
}

export default Services;
