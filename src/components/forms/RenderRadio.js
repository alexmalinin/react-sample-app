import React, {Component} from 'react';
import { Form, Radio } from 'semantic-ui-react'

export default class RenderRadio extends Component {

    state = {}
    handleChange = (e, { value }) => this.setState({ value })

    render() {
        let { input, placeholder, type, name, label, meta: { touched, error, warning }} = this.props;

        return(
            <div className="relative">
                <div className="absolute-click">
                </div>
                <div>
                    <Radio
                        {...input}
                        name={name}
                        label={label}
                        type={type}
                    />
                    {/*{touched &&*/}
                    {/*((error &&*/}
                    {/*<span>*/}
                    {/*{error}*/}
                    {/*</span>) ||*/}
                    {/*(warning &&*/}
                    {/*<span>*/}
                    {/*{warning}*/}
                    {/*</span>))}*/}
                </div>
            </div>
        )
    }
}