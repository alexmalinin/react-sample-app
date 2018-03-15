import React, {Component} from 'react';
import Select  from 'react-select';
import 'react-select/dist/react-select.css';

export default class RenderSelect extends Component {

    render() {

        console.log('my props', this.props.input.value);
        this.props.input.value[0] ? console.log('response', this.props.input.value[0].label) : console.log('error')

        let {
            meta: { touched, error, warning },
            input,
            ...rest
        } = this.props;
        let { value, onChange } = input;

        return (
            <div>
                <Select.Creatable
                    value={value}
                    onChange={onChange}
                    multi={true}
                    {...rest}
                />
                <div className='skillsField'>
                    {this.props.input.value ? this.props.input.value.map((item, key) => {
                        return <div className="skillItem" key={key}>{item.value}</div>
                    }) : null}
                </div>
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
