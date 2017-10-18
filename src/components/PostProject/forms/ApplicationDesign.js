import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {testCheckboxes} from '../../../helpers/selects/testCheckboxes';
import {renderField} from '../../forms/renders/RenderField';
import {DropdownAvailability} from '../../../styleComponents/StyledDropdown';
import RenderCheckbox from '../../forms/renders/RenderCheckbox';
import SlideTogle from '../../SlideTogle';

class WebDevelopment extends Component {

    render() {
        const { handleSubmit, submitting } = this.props;

        return(
            <DropdownAvailability>
                <SlideTogle height={'auto'}>
                    <p>Application design /</p>
                    { testCheckboxes
                        ? testCheckboxes.map( item =>
                            <Field
                                key={item}
                                name={`AppDesign.${item}`}
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