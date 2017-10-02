import React, {Component} from 'react';
import Availability from './Availability';
import { reduxForm } from 'redux-form';

class SpecialistAvailabilityForm extends Component {

   render() {

        return (
            <form onSubmit={this.props.handleSubmit}>
                <Availability {...this.props} submitBtn={true}/>
            </form>
        )
    }
}

export default reduxForm({
    form: 'SpecialistAvailabilityForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(SpecialistAvailabilityForm);
