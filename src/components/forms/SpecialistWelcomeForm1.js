import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { required, minLength2 } from '../../helpers/validate';
import {renderField} from './renders/RenderField';
import RenderSelect from './renders/RenderSelect';
import RenderCheckbox from './renders/RenderCheckbox';
import RenderMultiSelect from './renders/RenderMultiSelect';
import {industries} from '../../helpers/industries';
import {experiences} from '../../helpers/experiences';
import {skills} from '../../helpers/skills';
import DvButtonForm from '../../styleComponents/DvButtonForm'
import StyledCheckbox from '../../styleComponents/StyledCheckbox'
import InputField from './renders/InputField'
import LocationField from './renders/LocationField'
import RenderStyledCheckbox from './renders/RenderStyledCheckbox';

import { Route, Redirect } from 'react-router';
import { Grid, Button } from 'semantic-ui-react';

import DvTitle from '../../styleComponents/DvTitle'
import DvForm from '../../styleComponents/Tabs';

const SpecialistWelcomeForm1 = props => {
    const { handleSubmit, submitting } = props;
    return (
            <form onSubmit={handleSubmit}>
                <Grid>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <DvTitle mTop="80">
                                Welcome to The Digital Village!
                            </DvTitle>
                            <p>Please complete your profile so we can help you make the
                                most out of the Digital Village platform.
                            </p>

                            <Field
                                name="industry-select"
                                component={RenderSelect}
                                placeholder="Select your area within the digital industry /"
                                options={industries}
                                validate={[required]}
                            />
                            <InputField
                                name="industry_title"
                                placeholder="What is your industry title? /"
                                validate={[required]}
                            />
                            <LocationField/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <p>Select your speciality within that area /</p>
                            {skills
                                ? skills.map(item =>
                                    <Field
                                        name={`skills.${item.label}`}
                                        component={RenderStyledCheckbox}
                                        label={item.label}
                                        value={item.value}
                                    />)
                                : null
                            }
                            <Field
                                name="custom-skills"
                                component={RenderMultiSelect}
                                placeholder="Enter your skills here /"
                                validate={[required]}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <DvButtonForm
                                type="submit"
                                disabled={submitting}
                                content='Login'
                                primary
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </form>
    )
}

export default reduxForm({
    form: 'SpecialistWelcomeForm1',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(SpecialistWelcomeForm1)