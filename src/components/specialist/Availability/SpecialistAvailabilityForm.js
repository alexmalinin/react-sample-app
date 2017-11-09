import React, {Component} from 'react';
import { connect } from 'react-redux';
import Availability from './Availability';
import { reduxForm, change, focus } from 'redux-form';

class SpecialistAvailabilityForm extends Component {

   render() {
       const { specialistData } = this.props;

        return (
            <form onSubmit={this.props.handleSubmit}>
                <Availability specialistData={specialistData} {...this.props} submitBtn={true}/>
            </form>
        )
    }

    componentWillReceiveProps(nextProps) {
       const { touch, focus } = this.props
        if (nextProps.specialistData) {
            // touch('days.Monday');
            this.fillFields(nextProps.specialistData)
        }
    }
    //
    fillFields = data => {
        let { hours_per_week, available_days } = data;
        // this.props.initialize('SpecialistAvailabilityForm', 'days', {"Monday": true});
        console.log('data', data);
        this.props.dispatch(change('SpecialistAvailabilityForm', 'hours_per_week',   "20 - 30"));
        this.props.dispatch(change('SpecialistAvailabilityForm', 'days',   available_days));
        this.props.dispatch(change('SpecialistAvailabilityForm', 'availability', "Full Time"));
        // this.props.dispatch(change('SpecialistAvailabilityForm', 'hours_per_week',   "20 - 30"));
        // this.props.dispatch(focus('SpecialistAvailabilityForm', 'days.Monday'));
    }
}

SpecialistAvailabilityForm = reduxForm({
    form: 'SpecialistAvailabilityForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(SpecialistAvailabilityForm);

export default connect(({specialistData}) => ({specialistData}))(SpecialistAvailabilityForm);