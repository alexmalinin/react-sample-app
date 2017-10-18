import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Services from '../Services';

import { DvButton } from '../../../styleComponents/layout/DvButton';
import { DvTitleSmall } from '../../../styleComponents/layout/DvTitles';
import {renderField} from '../../forms/renders/RenderField';
import {daysAvailable} from '../../../helpers/selects/daysAvailable';
import {testCheckboxes} from '../../../helpers/selects/testCheckboxes';
import RenderCheckbox from '../../forms/renders/RenderCheckbox';
import {DropdownAvailability} from '../../../styleComponents/StyledDropdown';
import SlideTogle from '../../SlideTogle';

class WebDevelopment extends Component {

    render() {
        const { handleSubmit, submitting } = this.props;

        return(
            <DropdownAvailability>
                <SlideTogle height={'auto'}>
                    <p>Web development /</p>
                    { testCheckboxes
                        ? testCheckboxes.map( item =>
                            <Field
                                key={item}
                                name={`Development.${item}`}
                                component={RenderCheckbox}
                                label={item}
                                value={item}
                            /> )
                        : <p>empty</p>
                    }
                </SlideTogle>
            </DropdownAvailability>
        )
    }
}

export default WebDevelopment