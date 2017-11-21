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

class SkillsForm extends Component {

    render() {
        const { submitting, industry, industries, welcomeText, specialistData } = this.props;

        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column mobile={16} computer={8}>
                        <StyledWelcomeForm>
                            { welcomeText && [
                                <DvTitle mTop='80' xs key="1">
                                    Welcome to The Digital Village!

                                </DvTitle>,
                                <p key="2">
                                    Please complete your profile so we can help you make the
                                    most out of the Digital Village platform.
                                </p>
                                ]
                            }

                            <Field
                                name='industry'
                                component={RenderSelect}
                                placeholder='Select your area within the digital industry /'
                                options={industries["industry"]}
                                validate={[required]}
                            />
                            <InputField
                                name='industry_title'
                                placeholder='What is your industry title? /'
                                validate={[required]}
                            />
                            <LocationField/>
                        </StyledWelcomeForm>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <RenderSpecialityArea speciality={industries["speciality"]} industry={industry}/>
                        <RenderSkillsArea/>
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
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default SkillsForm;