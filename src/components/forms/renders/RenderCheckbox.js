import React, {Component} from 'react';
import { Checkbox } from 'semantic-ui-react'
import StyledError from '../../../styleComponents/StyledError'

export default class RenderRadio extends Component {

    render() {
        let { input, type, name, label, disabled, meta: { touched, error, warning }} = this.props;
        let { value, onChange, onFocus, onBlur } = input;

        return(
            <div>
                <div>
                    <Checkbox
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
            </div>
        )
    }
}