import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
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


class SpecialistWelcomeForm1 extends Component {

    render() {

        return (
            <form onSubmit={this.props.handleSubmit}>
                <SkillsForm { ...this.props }/>
            </form>
        )
    };
}

SpecialistWelcomeForm1 = reduxForm({
    form: 'SpecialistWelcomeForm1',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(SpecialistWelcomeForm1);

const selector = formValueSelector('SpecialistWelcomeForm1');
SpecialistWelcomeForm1 = connect(state => {
    const industry = selector(state, 'industry');
    return {industry}
})(SpecialistWelcomeForm1);

export default SpecialistWelcomeForm1;