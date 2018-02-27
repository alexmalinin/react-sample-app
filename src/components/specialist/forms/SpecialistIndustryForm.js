import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm, change, formValueSelector } from 'redux-form';
import {renderField} from '../../forms/renders/RenderField';
import SkillsForm from "./SkillsForm";

let renderError = true;

class SpecialistIndustryForm extends Component {

    render() {

        return (
            <form onSubmit={this.props.handleSubmit}>
                <SkillsForm { ...this.props }/>
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
        let { skills, specialities, industry_title } = data;

        let renderSkills = [];
        skills ? skills.forEach( item => {
            renderSkills.push({"label": item['name'], "value": item['id']})
        }) : null;

        let renderSpecialities = {};
        specialities ? specialities.forEach( item => {
            return renderSpecialities['_' + item['id']] = true;
        }) : null;

        this.props.dispatch(change('SpecialistIndustryForm', 'industry_title', industry_title));
        this.props.dispatch(change('SpecialistIndustryForm', 'skills_attributes', renderSkills ));
        if (specialities[0]) {
          this.props.dispatch(change('SpecialistIndustryForm', 'industry', { "label": specialities[0].industry_area['name'], "value": specialities[0].industry_area['id'] }));
        }
        Object.keys(renderSpecialities).length > 0
            ? this.props.dispatch(change('SpecialistIndustryForm', 'speciality_ids', renderSpecialities ))
            : null;
    }


}

SpecialistIndustryForm = reduxForm({
    form: 'SpecialistIndustryForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(SpecialistIndustryForm);

const selector = formValueSelector('SpecialistIndustryForm');
SpecialistIndustryForm = connect(state => {
    const industry = selector(state, 'industry');
    const { specialistData } = state;
    return {industry, specialistData }
})(SpecialistIndustryForm);

export default SpecialistIndustryForm;