import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { required, minLength2 } from '../../helpers/validate';
import {RenderField} from './renders/RenderField';
import RenderSelect from './renders/RenderSelect';
import RenderCheckbox from './renders/RenderCheckbox';
import RenderMultiSelect from './renders/RenderMultiSelect';
import {industries} from '../../helpers/industries';
import {experiences} from '../../helpers/experiences';
import {speciality} from '../../helpers/speciality';
import DvButtonForm from '../../styleComponents/DvButtonForm'
import DvButton from '../../styleComponents/DvButton'
import StyledCheckbox from '../../styleComponents/forms/StyledCheckbox'
import InputField from './renders/InputField'
import LocationField from './renders/LocationField'
import RenderStyledCheckbox from './renders/RenderStyledCheckbox';

import { Route, Redirect } from 'react-router';
import { Grid, Button } from 'semantic-ui-react';
import RenderImage from './renders/RenderImage'
import RenderTextArea from './renders/RenderTextArea'

import DvTitle from '../../styleComponents/DvTitle'
import DvForm from '../../styleComponents/Tabs';
import RenderCustomSkills from '../RenderCustomSkills';
import RenderChosenSpecialises from '../RenderChosenSpecialises';

const SpecialistWelcomeForm2 = props => {
    const { handleSubmit, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <h2>Awesome! Tell us more! /</h2>
                        <p>Upload your photo /</p>
                        <Field
                            name="person-image"
                            component={RenderImage}
                            type="file"
                            placeholder="Choose your photo/"
                        />
                        <div>
                            <p>Write a paragraph or two about your professional experience /</p>
                            <Field name="message" component={RenderTextArea} validate={required}/>
                        </div>
                        {/*<DvButton*/}
                            {/*type="submit"*/}
                            {/*disabled={submitting}*/}
                            {/*content='CONTINUE'*/}
                            {/*primary*/}
                        {/*/>*/}
                        <div>
                            <p><b>Education</b> / List any formal education here /</p>
                            <h3>There will be cards</h3>
                        </div>
                        <div>
                            <p><b>Work Experience</b> / Tell us about previous companies <br/>
                                you’ve worked at, projects you’ve worked on or things <br/>
                                you’ve built /
                            </p>
                            <h3>There will be cards</h3>
                        </div>
                        <div>
                            <p>Set your rate /</p>
                            <br/>
                            <p>Hourly</p>
                            <Field
                                name="hourly-rate"
                                component={RenderField}
                                type="number"
                                placeholder="AUD $"
                            />
                            <p>Daily</p>
                            <Field
                                name="daily-rate"
                                component={RenderField}
                                type="number"
                                placeholder="AUD $"
                            />
                        </div>
                        <div>
                            <p><b>Set your availability</b> / This can be easily changed at anytime</p>
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>

                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </form>
    )
}

export default reduxForm({
    form: 'SpecialistWelcomeForm2',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(SpecialistWelcomeForm2)