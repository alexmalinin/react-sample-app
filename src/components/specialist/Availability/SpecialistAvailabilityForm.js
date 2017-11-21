import React, {Component} from 'react';
import { connect } from 'react-redux';
import Availability from './Availability';
import { reduxForm, change } from 'redux-form';

let renderError = true

class SpecialistAvailabilityForm extends Component {

   render() {
       const { specialistData, handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <Availability specialistData={specialistData} {...this.props} submitBtn={true}/>
            </form>
        )
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.specialistData) {
            if(renderError) {
                this.fillFields(nextProps.specialistData);
                renderError = false;
            }

            if (nextProps.specialistData.successAvailabilityId) {
                this.fillFields(nextProps.specialistData);
            }
        }
    }

    fillFields = data => {
        let { hours_per_week, available_days, available } = data;
        console.log('data', data);
        this.props.dispatch(change('SpecialistAvailabilityForm', 'hours_per_week',   hours_per_week));
        this.props.dispatch(change('SpecialistAvailabilityForm', 'days',   available_days));
        this.props.dispatch(change('SpecialistAvailabilityForm', 'availability', available));
    }
}

SpecialistAvailabilityForm = reduxForm({
    form: 'SpecialistAvailabilityForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(SpecialistAvailabilityForm);

export default connect(({specialistData}) => ({specialistData}))(SpecialistAvailabilityForm);