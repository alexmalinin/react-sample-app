import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { required, } from '../../../helpers/validate';
import {RenderField} from '../renders/RenderField';
import RenderSelect from '../renders/RenderSelect';
import {workHourses} from '../../../helpers/workHourses';
import {projectInterest} from '../../../helpers/projectInterest';
import { DvButton } from '../../../styleComponents/DvButton';
import { Route, Redirect } from 'react-router';
import { Grid } from 'semantic-ui-react';
import RenderImage from '../renders/RenderImage';
import RenderTextArea from '../renders/RenderTextArea';
import RenderPhone from '../renders/RenderPhone';
import Availability from '../Availability/Availability';

class SpecialistWelcomeForm2 extends Component {

    render() {
        const { handleSubmit, submitting } = this.props;

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

                            <Availability/>

                            <Field
                                name="work-hourses"
                                component={RenderSelect}
                                placeholder="Hours per week"
                                options={workHourses}
                                validate={[required]}
                            />
                            <p>What kind of Projects are you interested in? /</p>
                            <Field
                                name="project-interest"
                                component={RenderSelect}
                                multi={true}
                                placeholder="You can select more than one"
                                options={projectInterest}
                                validate={[required]}
                            />

                            <p>What is your contact number? /</p>
                            <RenderPhone/>

                            <DvButton
                                type="submit"
                                disabled={submitting}
                                content='SAVE'
                                primary
                            />
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
}


export default reduxForm({
    form: 'SpecialistWelcomeForm2',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(SpecialistWelcomeForm2)