import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { required } from '../../../helpers/validate';
import {renderField} from '../../forms/renders/RenderField';
import RenderSelect from '../../forms/renders/RenderSelect';
import RenderMultiSelect from '../../forms/renders/RenderMultiSelect';
import {industries} from '../../../helpers/selects/industries';
import {speciality} from '../../../helpers/selects/speciality';
import { DvButton } from '../../../styleComponents/layout/DvButton';
import InputField from '../../forms/renders/InputField';
import LocationField from '../../forms/renders/LocationField';
import RenderStyledCheckbox from '../../forms/renders/RenderStyledCheckbox';
import { Route, Redirect } from 'react-router';
import { Grid } from 'semantic-ui-react';
import {DvTitle} from '../../../styleComponents/layout/DvTitles';
import StyledWelcomeForm from '../../../styleComponents/StyledWelcomeForm';
import RenderSpecialityArea from '../../forms/renders/RenderSpecialityArea'
import RenderSkillsArea from '../../forms/renders/RenderSkillsArea'
import { formValueSelector } from 'redux-form';
import {clientCategories} from '../../../helpers/selects/clientCategories';
import RenderTextArea from '../../forms/renders/RenderTextArea';
import axios from 'axios';

class EducationForm extends Component {

    render() {
        const { handleSubmit, submitting } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column mobile={16} computer={8}>
                            <StyledWelcomeForm>
                                <br/>
                                <br/>
                                {/*<DvTitle mTop='80' xs>*/}
                                    {/*Welcome to The Digital Village!*/}
                                {/*</DvTitle>*/}
                                {/*<p>*/}
                                    {/*Please complete your profile so we can help you make the*/}
                                    {/*most out of the Digital Village platform.*/}
                                {/*</p>*/}
                                <InputField
                                    name='school'
                                    placeholder='School /'
                                    // validate={[required]}
                                />
                                <InputField
                                    name='area_of_study'
                                    placeholder='Area of study /'
                                    // validate={[required]}
                                />
                                <InputField
                                    name='degree'
                                    placeholder='Degree /'
                                    // validate={[required]}
                                />
                                <InputField
                                    name='from'
                                    placeholder='From /'
                                    // validate={[required]}
                                />
                                <InputField
                                    name='to'
                                    placeholder='To /'
                                    // validate={[required]}
                                />
                            </StyledWelcomeForm>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <label>
                                Description
                                <Field name="description" component={RenderTextArea}/>
                            </label>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <DvButton
                                type="submit"
                                disabled={submitting}
                                content='SAVE & CONTINUE'
                                primary
                            />
                            <DvButton
                                onClick={ this.closeModal }
                                content='CLOSE'
                                disabled={submitting}
                                primary
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </form>
        )
    }


    closeModal = ev => {
        ev.preventDefault();
        let close = document.querySelector('i.close.icon');
        close.click();
    }
}

export default reduxForm({
    form: 'EducationForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(EducationForm);