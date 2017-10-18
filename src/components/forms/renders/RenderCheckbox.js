import React, {Component} from 'react';
import { Checkbox } from 'semantic-ui-react'
import { Days } from '../../../styleComponents/StyledDropdown';
import StyledError from '../../../styleComponents/forms/StyledError'

export default class RenderRadio extends Component {

    render() {
        let { input, label, disabled, meta: { touched, error, warning }} = this.props;
        let { onFocus, onBlur } = input;

        return(
            <div>
                <Days
                    onFocus={onFocus}
                    onBlur={onBlur}
                    label={label}
                    disabled={disabled}
                />
                {touched &&
                ((error &&
                <StyledError>
                {error}
                </StyledError>) ||
                (warning &&
                <span>
                {warning}
                </span>))}
            </div>
        )
    }
}
