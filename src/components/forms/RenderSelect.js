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

        return (
            <div>
                {/*<div>*/}
                {console.log('input:', input)}
                <Select {...input} {...rest}>
                </Select>
                {/*{touched &&*/}
                {/*((error &&*/}
                {/*<span>*/}
                {/*{error}*/}
                {/*</span>) ||*/}
                {/*(warning &&*/}
                {/*<span>*/}
                {/*{warning}*/}
                {/*</span>))}*/}
                {/*</div>*/}
            </div>
        )
    }
}
