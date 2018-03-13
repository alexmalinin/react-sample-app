import React, {Component} from 'react';
import {connect} from 'react-redux'
import StyledRadio from '../../../styleComponents/forms/StyledRadio'

class RenderRadio extends Component {
    componentWillMount(){
        // this.props.input.checked = this.props.checked;
    }

    render() {
        const {input, label, name, checked, onChange} = this.props;

        return (
            <StyledRadio>
                <label>
                    <input className='ownInput'
                           type='radio'
                           {...input}
                           checked={checked}
                           name={name}

                    />
                    <span className={`ownRadio`}>{label}</span>
                </label>
            </StyledRadio>
        )
    }
}

export default connect(({form}) => ({form}))(RenderRadio)
