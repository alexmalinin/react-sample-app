import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { required, } from '../../helpers/validate';
import {RenderField} from './renders/RenderField';
import RenderSelect from './renders/RenderSelect';
import {workHourses} from '../../helpers/workHourses';
import {daysAvailable} from '../../helpers/daysAvailable';
import {projectInterest} from '../../helpers/projectInterest';
import DvButton from '../../styleComponents/DvButton';
import RenderCheckbox from './renders/RenderCheckbox';
import { Route, Redirect } from 'react-router';
import { Grid, Button } from 'semantic-ui-react';
import RenderImage from './renders/RenderImage';
import RenderTextArea from './renders/RenderTextArea';
import RenderPhone from './renders/RenderPhone';
import AvailabilityForm from './AvailabilityForm';
import AnimateHeight from 'react-animate-height';

class SpecialistWelcomeForm2 extends Component {

    state = {
        heightDays: '0',
        heightTime: '0',
    };

    render() {
        let { heightDays, heightTime  } = this.state;
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
                            <div>
                                <p><b>Set your availability</b> / This can be easily changed at anytime</p>
                                <p onClick={this.handleHeight('time')}>Full-time / Part-time / Not available (@Eselein, this is clickble)</p>
                                <AnimateHeight
                                    duration={500}
                                    height={heightTime}
                                >
                                    <AvailabilityForm/>
                                </AnimateHeight>
                            </div>
                            <div>
                                <p onClick={this.handleHeight('days')}>Days available(@Eselein, this is clickble)</p>
                                <AnimateHeight
                                    duration={500}
                                    height={heightDays}
                                >

                                    {daysAvailable
                                        ? daysAvailable.map(item =>
                                            <Field
                                                key={item}
                                                name={`days.${item}`}
                                                component={RenderCheckbox}
                                                label={item}
                                                value={item}
                                            />)
                                        : null
                                    }
                                </AnimateHeight>
                            </div>
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

    handleHeight = arg => ev => {
        let { heightDays, heightTime } = this.state;
        if (arg === 'days') {
            heightDays === 'auto'
                ? this.setState({
                    heightDays: '0',
                })
                : this.setState({
                    heightDays: 'auto',
                })
        } else {
            heightTime === 'auto'
                ? this.setState({
                    heightTime: '0',
                })
                : this.setState({
                    heightTime: 'auto',
                })
        }
    }
}


export default reduxForm({
    form: 'SpecialistWelcomeForm2',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(SpecialistWelcomeForm2)