import React, {Component} from 'react';
import Select  from 'react-select';
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
            <div>
                {/*<div>*/}
                <Select.Creatable
                    value={value}
                    onChange={onChange}
                    multi={true}
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
