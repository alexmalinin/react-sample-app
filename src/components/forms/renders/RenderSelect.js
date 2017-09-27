import React, {Component} from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class RenderSelect extends Component {

    render() {
        let {
            meta: { touched, error, warning },
            input,
            ...rest
        } = this.props;
        let { value, onChange } = input;

        return (
            <div style={{minWidth: '100px'}}>
                {/*<div>*/}
                <Select
                    value={value}
                    onChange={onChange}
                    {...rest}
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
        )
    }
}
