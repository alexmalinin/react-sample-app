import React, {Component} from 'react';
import 'react-select/dist/react-select.css';
import StyledInputs from '../../../styleComponents/forms/StyledInputs'
import StyledError from '../../../styleComponents/forms/StyledError'
import StyledSelect from '../../../styleComponents/forms/StyledSelect'

export default class RenderSelect extends Component {

    handleSelectChange = (e) => {
        const { label, value } = e
        const { input, handleFormField } = this.props
        const { name, onChange } = input
        onChange(e)

        handleFormField({
            target: {
                name,
                value
            }
        })
    }

    render() {
        let {
            meta: { touched, error, warning },
            input,
            label,
            small,
            handleFormField,
            ...rest
        } = this.props;
        let { value, onChange } = input;

        return (
            <StyledInputs {...rest} small={small}>
                <label>{label}</label>
                <StyledSelect
                    error={touched && error}
                    value={ value }
                    onChange={this.handleSelectChange}
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
