import React, {Component} from 'react';
import StyledError from '../../../styleComponents/forms/StyledError'
import StyledRadio from '../../../styleComponents/forms/StyledRadio'

class RenderCircleCheckbox extends Component {

    render() {
        let { input, label, disabled, meta: { touched, error, warning }} = this.props;
        let { onFocus, onBlur } = input;

        return(
            <StyledRadio>
                <label>
                    <input type='checkbox' className='ownInput'
                        // onFocus={onFocus}
                        // onBlur={onBlur}
                        {...input}
                        disabled={disabled}
                    />
                    <span className={`ownRadio`}>{label}</span>
                </label>
                {touched &&
                ((error &&
                <StyledError>
                {error}
                </StyledError>) ||
                (warning &&
                <span>
                {warning}
                </span>))}
            </StyledRadio>
        )
    }
}

export default RenderCircleCheckbox;
