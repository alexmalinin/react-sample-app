import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm, change } from 'redux-form';
import { required } from '../../../helpers/validate';
import { job_titles } from '../../../helpers/selects/job_titles';
import {RenderField} from '../../forms/renders/RenderField';
import RenderSelect from '../../forms/renders/RenderSelect';
import {speciality} from '../../../helpers/selects/speciality';
import { DvButton } from '../../../styleComponents/layout/DvButton';
import InputField from '../../forms/renders/InputField';
import { Grid } from 'semantic-ui-react';
import {DvTitle} from '../../../styleComponents/layout/DvTitles';
import StyledWelcomeForm from '../../../styleComponents/StyledWelcomeForm';
import RenderSpecialityArea from '../../forms/renders/RenderSpecialityArea'
import RenderSkillsArea from '../../forms/renders/RenderSkillsArea'
import Communication from '../Communication/Communication';
import Availability from '../Availability/Availability';

class SkillsForm extends Component {

    render() {
        const { submitting, industry, industries, projectTypes, experienceLevels, welcomeText } = this.props;

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

                          <div id="job_title" className='half-column'>
                            <Field
                              name="job_title"
                              component={RenderSelect}
                              placeholder="I Am a"
                              options={job_titles}
                            />
                          </div>


                          <InputField
                            name="position"
                            placeholder="Position /"
                          />

                          <InputField
                            name='industry_title'
                            placeholder='What is your industry title? /'
                          />

                          {/*doesn't save value*/}
                          <div id="experience_level" className='half-column'>
                            <Field
                              name="experience_level"
                              component={RenderSelect}
                              placeholder="Experience Level"
                              options={experienceLevels}
                              validate={[required]}
                            />
                          </div>

                          <span id="industry"/> {/*for error scrolling*/}
                            <Field
                                name='industry'
                                component={RenderSelect}
                                placeholder='Select your area within the digital industry /'
                                options={industries["industry"]}
                            />
                            <span id="industry_title"/> {/*for error scrolling*/}

                          <RenderSpecialityArea speciality={industries["speciality"]} industry={industry}/>
                          <RenderSkillsArea/>
                        </StyledWelcomeForm>
                    </Grid.Column>

                    <Grid.Column mobile={16} computer={8}>

                      <InputField
                        name="contact_number"
                        placeholder="Best Contact Number /"
                      />

                      <div id="project_type" className='half-column'>
                        <Field
                          name="project_type"
                          component={RenderSelect}
                          placeholder="Project Interest"
                          options={projectTypes}
                          validate={[required]}
                        />
                      </div>

                      <div className='rate'>

                        <div className='flex-wrapper'>
                          <div>
                            <Field
                              name="hourly_rate"
                              component={RenderField}
                              type="number"
                              placeholder="Hourly Rate /"
                            />
                          </div>

                        </div>
                      </div>

                      <Availability />

                      <Communication />

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