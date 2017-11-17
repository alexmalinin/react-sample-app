import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm, change } from 'redux-form';
import InfoForm from "./InfoForm";

let renderError = true;

class SpecialistInfoForm extends Component {

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <InfoForm {...this.props}/>
            </form>
        )
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.specialistData) {
            if (renderError) {
                this.fillFields(nextProps.specialistData);
                renderError = false
            }
        }
    }

    fillFields = data => {
        let { hourly_rate, daily_rate, professional_experience_info, project_type } = data;

        let renderProjectTypes = {"label": project_type["name"], "value": project_type["id"]};

        this.props.dispatch(change('SpecialistInfoForm', 'professional_experience_info',  professional_experience_info));
        this.props.dispatch(change('SpecialistInfoForm', 'daily_rate',  daily_rate));
        this.props.dispatch(change('SpecialistInfoForm', 'hourly_rate',  hourly_rate));
        this.props.dispatch(change('SpecialistInfoForm', 'project_type',   renderProjectTypes));
    }

}

export default reduxForm({
    form: 'SpecialistInfoForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(SpecialistInfoForm)
