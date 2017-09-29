import React, {Component} from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import StyledInputs from '../../../styleComponents/StyledInputs'
import StyledError from '../../../styleComponents/StyledError'

export default class RenderSelect extends Component {

    render() {
        let {
            meta: { touched, error, warning },
            input,
            ...rest
        } = this.props;
        let { value, onChange } = input;

        return (
            <StyledInputs>
                <Select
                    value={value}
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
