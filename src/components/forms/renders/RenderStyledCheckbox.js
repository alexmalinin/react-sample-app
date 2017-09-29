import React, {Component} from 'react';
import StyledCheckbox from '../../../styleComponents/forms/StyledCheckbox'

export default class RenderRadio extends Component {

    render() {
        let { input, type, name, label, disabled, meta: { touched, error, warning }} = this.props;
        let { value, onChange, onFocus, onBlur } = input;

        return(
                <StyledCheckbox>
                    <label>
                        <input
                            onFocus={onFocus}
                            onBlur={onBlur}
                            label={label}
                            type="checkbox"
                            disabled={disabled}
                        />
                        <div>{label}</div>
                    </label>
                    {touched &&
                    ((error &&
                        <span>
                    {error}
                    </span>) ||
                        (warning &&
                            <span>
                    {warning}
                    </span>))}
                </StyledCheckbox>
        )
    }
}