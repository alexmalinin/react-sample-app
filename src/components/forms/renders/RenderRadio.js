import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Popup} from 'semantic-ui-react'

class RenderRadio extends Component {


    render() {
        const {input, label, name} = this.props;

        return (
            <div className="radio-group">
                <label>

                    <input className="ownInput"
                           type="radio"
                           {...input}
                           name={name}

                    />
                    <span className={`ownRadio`}>{label}</span>
                </label>
            </div>
        )
    }
}

export default connect(({form}) => ({form}))(RenderRadio)
