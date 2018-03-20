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
                <Select.Creatable
                    value={value}
                    onChange={onChange}
                    multi={true}
                    {...rest}
                />
                {/* <div className='skillsField'>
                    {this.props.input.value ? this.props.input.value.map((item, key) => {
                        return <div className="skillItem" key={key}>
                                    {item.value}
                                    <button onClick={console.log(this.props, 'myprops')}>x</button>
                                </div>
                    }) : null}
                </div> */}
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
