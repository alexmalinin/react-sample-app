import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm, change } from 'redux-form';
import { required } from '../../../helpers/validate';
import {renderField} from '../../forms/renders/RenderField';
import RenderSelect from '../../forms/renders/RenderSelect';
import {speciality} from '../../../helpers/selects/speciality';
import { DvButton } from '../../../styleComponents/layout/DvButton';
import InputField from '../../forms/renders/InputField';
import LocationField from '../../forms/renders/LocationField';
import { Grid } from 'semantic-ui-react';
import {DvTitle} from '../../../styleComponents/layout/DvTitles';
import StyledWelcomeForm from '../../../styleComponents/StyledWelcomeForm';
import RenderSpecialityArea from '../../forms/renders/RenderSpecialityArea'
import RenderSkillsArea from '../../forms/renders/RenderSkillsArea'
import SkillsForm from "./SkillsForm";
import { formValueSelector } from 'redux-form';
import { run } from '../../../helpers/scrollToElement';

class SpecialistWelcomeForm1 extends Component {

    render() {

        return (
            <form onSubmit={this.props.handleSubmit}>
                <SkillsForm { ...this.props }/>
            </form>
        )
    }

    componentDidMount() {
        this.fill = localStorage.getItem('fillForm1') ? localStorage.getItem('fillForm1') : null;
        this.fill && this.fillFieldsStatic(JSON.parse(this.fill));

    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.industries) {
            this.fill && this.fillFieldAsync(JSON.parse(this.fill))
        }
    }

    fillFieldAsync = data => {
        let { industry, speciality_ids } = data;
        let renderSpecialities = {};
        let specialities = Object.keys(speciality_ids);
        specialities ? specialities.forEach( item => {
            return renderSpecialities[item] = true;
        }) : null;

        this.props.dispatch(change('SpecialistWelcomeForm1', 'industry', industry ));
        Object.keys(renderSpecialities).length > 0
            ? this.props.dispatch(change('SpecialistWelcomeForm1', 'speciality_ids', renderSpecialities ))
            : null;
    };

    fillFieldsStatic = data => {
        let { skills_attributes, country, city, industry_title, } = data;
        let renderSkills = [];
        skills_attributes ? skills_attributes.forEach( item => {
            renderSkills.push(item)
        }) : null;

        this.props.dispatch(change('SpecialistWelcomeForm1', 'industry_title', industry_title));
        this.props.dispatch(change('SpecialistWelcomeForm1', 'country', country));
        this.props.dispatch(change('SpecialistWelcomeForm1', 'city', city));
        this.props.dispatch(change('SpecialistWelcomeForm1', 'skills_attributes', renderSkills ));
        // console.log('renderSkills', renderSkills);
    }
}

const handleSubmitFail = (errors) => {
    run(document.getElementById(`${Object.keys(errors)[0]}`))();
};

SpecialistWelcomeForm1 = reduxForm({
    form: 'SpecialistWelcomeForm1',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    onSubmitFail: handleSubmitFail,
})(SpecialistWelcomeForm1);

const selector = formValueSelector('SpecialistWelcomeForm1');
SpecialistWelcomeForm1 = connect(state => {
    const industry = selector(state, 'industry');
    return {industry}
})(SpecialistWelcomeForm1);

export default SpecialistWelcomeForm1;