import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm, change, formValueSelector } from 'redux-form';
import {renderField} from '../../forms/renders/RenderField';
import SkillsForm from "./SkillsForm";

let renderError = true;


window.change = change;


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
            this.fillFields(nextProps.specialistData);
        }
    }

    fillFields = data => {
        let { skills, specialities, address, industry_title, } = data;

        let renderSkills = [];
        skills ? skills.forEach( item => {
            renderSkills.push({"label": item['name'], "value": item['id']})
        }) : null;

        let renderSpecialities = {length: 0};
        specialities ? specialities.forEach( item => {
            renderSpecialities['_' + item['id']] = true;
            renderSpecialities.length++;
        }) : null;
        console.log(renderSpecialities);
        window.renderSpecialities = renderSpecialities;
        this.props.dispatch(change('SpecialistIndustryForm', 'industry_title', industry_title));
        this.props.dispatch(change('SpecialistIndustryForm', 'country', address.country));
        this.props.dispatch(change('SpecialistIndustryForm', 'city', address.city));
        this.props.dispatch(change('SpecialistIndustryForm', 'skills_attributes', renderSkills ));
        this.props.dispatch(change('SpecialistIndustryForm', 'industry', { "label": specialities[0].industry_area['name'], "value": specialities[0].industry_area['id'] }));
        renderSpecialities.length
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