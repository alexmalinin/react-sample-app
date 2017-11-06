import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import { required, } from '../../../helpers/validate';
import { RenderField } from '../../forms/renders/RenderField';
import RenderSelect from '../../forms/renders/RenderSelect';
import StyledPhoneField from '../../../styleComponents/forms/StyledPhoneField';
import {projectInterest} from '../../../helpers/selects/projectInterest';
import { Route, Redirect } from 'react-router';
import { Grid } from 'semantic-ui-react';
import RenderImage from '../../forms/renders/RenderImage';
import RenderTextArea from '../../forms/renders/RenderTextArea';
import RenderPhone from '../../forms/renders/RenderPhone';
import Availability from '../Availability/Availability';
import { DvTitleSmall } from '../../../styleComponents/layout/DvTitles';
import { DvButton } from '../../../styleComponents/layout/DvButton';
import RenderCards from '../renders/RenderCards';
import RenderWorkCard from '../renders/RenderWorkCard';
import StyledSpecialistWelcomeForm2 from '../../../styleComponents/StyledSpecialistWelcomeForm2'
import { AddNewBtn } from '../../../styleComponents/layout/DvButton'
import EdicationModal from '../../modals/EdicationModal';
import WorkExperienceModal from '../../modals/WorkExperienceModal';

class SpecialistWelcomeForm2 extends Component {

    render() {
        const { handleSubmit, submitting, educations, experiences } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <StyledSpecialistWelcomeForm2>
                                <DvTitleSmall>Awesome! Tell us more! /</DvTitleSmall>
                                <p>Upload your photo /</p>
                                <Field
                                    name='person'
                                    component={RenderImage}
                                    type='file'
                                    placeholder='Choose your photo /'
                                />

                                <div className='text-area-group'>
                                    <p>Write a paragraph or two about your professional experience /</p>
                                    <Field name='professional_experience_info' component={RenderTextArea} validate={required}/>
                                </div>

                                <div>
                                    <p><b>Education</b> / List any formal education here /</p>

                                    <div className='flex-wrapper'>
                                        <RenderCards educations={educations}/>
                                    </div>

                                    <EdicationModal/>
                                </div>

                                <div>
                                    <p><b>Work Experience</b> / Tell us about previous companies <br/>
                                        you’ve worked at, projects you’ve worked on or things <br/>
                                        you’ve built /
                                    </p>

                                    <div className='flex-wrapper'>
                                        <RenderCards experiences={experiences}/>
                                    </div>

                                    <WorkExperienceModal/>
                                </div>

                                <div className='rate'>
                                    <p><b>Set your rate /</b></p>

                                    <div className='flex-wrapper'>
                                        <div>
                                            <p>Hourly</p>
                                            <Field
                                                name="hourly-rate"
                                                component={RenderField}
                                                type="number"
                                                placeholder="AUD $"
                                            />
                                        </div>
                                        <div>
                                            <p>Daily</p>
                                            <Field
                                                name="daily-rate"
                                                component={RenderField}
                                                type="number"
                                                placeholder="AUD $"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/*<Field*/}
                                    {/*name="work-hourses"*/}
                                    {/*component={RenderSelect}*/}
                                    {/*placeholder="Hours per week"*/}
                                    {/*options={workHourses}*/}
                                    {/*validate={[required]}*/}
                                {/*/>*/}

                                <Availability/>

                                <div className='half-column'>
                                    <p><b>What kind of Projects are you interested in? /</b></p>
                                    <Field
                                        name="project-interest"
                                        component={RenderSelect}
                                        multi={true}
                                        placeholder="You can select more than one"
                                        options={projectInterest}
                                        validate={[required]}
                                    />
                                </div>

                                {/*<div className='half-column'>*/}
                                    {/*<p><b>What is your contact number? /</b></p>*/}
                                    {/*<StyledPhoneField>*/}
                                        {/*<span>Phone /</span>*/}
                                        {/*<RenderPhone/>*/}
                                    {/*</StyledPhoneField>*/}
                                {/*</div>*/}

                                <DvButton
                                    type='submit'
                                    disabled={submitting}
                                    content='SAVE'
                                    primary
                                />
                            </StyledSpecialistWelcomeForm2>
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
})(
    connect(({educations, experiences}) => ({educations, experiences}))(SpecialistWelcomeForm2)
)
