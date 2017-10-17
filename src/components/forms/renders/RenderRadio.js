import React, {Component} from 'react';
import {connect} from 'react-redux'
import StyledRadio from '../../../styleComponents/forms/StyledRadio'

class RenderRadio extends Component {


    render() {
        const {input, label, name} = this.props;

        return (
            <StyledRadio>
                <label>
                    <input className="ownInput"
                           type="radio"
                           {...input}
                           name={name}

                    />
                    <span className={`ownRadio`}>{label}</span>
                </label>
            </StyledRadio>
        )
    }
}

export default connect(({form}) => ({form}))(RenderRadio)
