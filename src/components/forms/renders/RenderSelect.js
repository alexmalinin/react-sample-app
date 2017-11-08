import React, {Component} from 'react';
import 'react-select/dist/react-select.css';
import StyledInputs from '../../../styleComponents/forms/StyledInputs'
import StyledError from '../../../styleComponents/forms/StyledError'
import StyledSelect from '../../../styleComponents/forms/StyledSelect'

export default class RenderSelect extends Component {

    render() {
        let {
            meta: { touched, error, warning },
            input,
            ...rest
        } = this.props;
        let { value, onChange } = input;
        console.log('value', value);

        return (
            <StyledInputs>
                <StyledSelect
                    error={touched && error}
                    value={ value }
                    onChange={onChange}
                    {...rest}
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
            </StyledInputs>
        )
    }
}
