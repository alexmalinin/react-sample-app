import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {testCheckboxes} from '../../../helpers/selects/testCheckboxes';
import {renderField} from '../../forms/renders/RenderField';
import RenderCheckbox from '../../forms/renders/RenderCheckbox';
import { DropDownCircle } from '../../../styleComponents/StyledDropdown';
import SlideTogle from '../../SlideTogle';

class WebDevelopment extends Component {

    state = {
        isOpen: false
    };

    render() {

        return(
            <DropDownCircle>
                <SlideTogle height={'0'}>
                    <p onClick={ this.handleClick }>Application design /<a className={ this.state.isOpen && 'active' }/></p>
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
            </DropDownCircle>
        )
    }

    handleClick = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        })
    }
}

export default WebDevelopment