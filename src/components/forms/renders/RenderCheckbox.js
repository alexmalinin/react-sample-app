import React, {Component} from 'react';
import { Checkbox } from 'semantic-ui-react'

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
                    <span>
                    {error}
                    </span>) ||
                    (warning &&
                    <span>
                    {warning}
                    </span>))}
                </div>
            </div>
        )
    }
}