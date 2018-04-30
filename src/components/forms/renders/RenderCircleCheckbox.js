import React, {Component} from 'react';
import StyledError from '../../../styleComponents/forms/StyledError'
import StyledRadio from '../../../styleComponents/forms/StyledRadio'

class RenderCircleCheckbox extends Component {

    componentWillReceiveProps(nextProps) {
      let { handleSpecialityCheckbox } = this.props;
      handleSpecialityCheckbox ?
        handleSpecialityCheckbox(this.props.itemValue, nextProps)
        : '';
    }

    render() {
        let { input, label, disabled, meta: { touched, error, warning }} = this.props;

        return(
            <StyledRadio>
                <label>
                    <input type='checkbox' className='ownInput'
                        {...input}
                        disabled={disabled}
                    />
                    <span className={`ownRadio`}>{label}</span>
                </label>
                {touched &&
                ((error &&
                <StyledError className="checkbox-error">
                {error}
                </StyledError>) ||
                (warning &&
                <span>
                {warning}
                </span>))}
            </StyledRadio>
        )
    }
}

export default RenderCircleCheckbox;
