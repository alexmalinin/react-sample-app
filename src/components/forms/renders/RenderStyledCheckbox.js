import React, {Component} from 'react';
import StyledCheckbox from '../../../styleComponents/forms/StyledCheckbox'

export default class RenderRadio extends Component {

    render() {
        let { input, label, disabled, meta: { touched, error, warning }} = this.props;

        return(
                <StyledCheckbox>
                    <label>
                        <input
                            {...input}
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