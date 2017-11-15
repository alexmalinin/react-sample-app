import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm, change, formValueSelector } from 'redux-form';
import {renderField} from '../../forms/renders/RenderField';
import { showSpecialistData } from '../../../actions/actions';
import SkillsForm from "./SkillsForm";

let renderError = true;


window.change = change;


class SpecialistIndustryForm extends Component {

    componentWillMount() {
        this.props.showSpecialistData();
    }

    render() {

        return (
            <form ref={this.getNativeForm} onSubmit={this.props.handleSubmit}>
                <SkillsForm { ...this.props }/>
            </form>
        )
    }

    componentWillUpdate(nextProps) {
        if (nextProps.specialistData) {
            if (renderError) {
                this.fillFields(nextProps.specialistData);
                console.log('--------------------------------------render');
                // no do this feature
                // renderError = false;
            }
        }
    }
    //
    //

    getNativeForm = ref => {
        this.form = ref;
    };

    fillFields = data => {
        console.log('receive data');
        console.log(data);
        let { skills, specialities, address, industry_title, } = data;

        let renderSkills = [];
        skills ? skills.forEach( item => {
            renderSkills.push({"label": item['name'], "value": item['id']})
        }) : null;

        let renderSpecialities = [];
        specialities ? specialities.forEach( item => {
            renderSpecialities.push(item['id']);
        }) : null;

        this.props.dispatch(change('SpecialistIndustryForm', 'industry_title', industry_title));
        this.props.dispatch(change('SpecialistIndustryForm', 'country', address.country));
        this.props.dispatch(change('SpecialistIndustryForm', 'city', address.city));
        this.props.dispatch(change('SpecialistIndustryForm', 'skills_attributes', renderSkills ));
        console.log({text: 'input[name="speciality_ids._' + renderSpecialities[0] + '"]'});
        this.form.querySelectorAll('input[name="speciality_ids._' + renderSpecialities[0] + '"]')[0]
            ? renderSpecialities.map( item => {
                return this.form.querySelectorAll('input[name="speciality_ids._' + item + '"]')[0].checked = true;
            })
            : null;
        this.props.dispatch(change('SpecialistIndustryForm', 'industry', { "label": specialities[0].industry_area['name'], "value": specialities[0].industry_area['id'] }));
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
}, { showSpecialistData })(SpecialistIndustryForm);

export default SpecialistIndustryForm;