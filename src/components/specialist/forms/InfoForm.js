import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import { required, } from '../../../helpers/validate';
import { RenderField } from '../../forms/renders/RenderField';
import RenderSelect from '../../forms/renders/RenderSelect';
import { Grid } from 'semantic-ui-react';
import RenderImage from '../../forms/renders/RenderImage';
import RenderTextArea from '../../forms/renders/RenderTextArea';
import Availability from '../Availability/Availability';
import { DvTitleSmall } from '../../../styleComponents/layout/DvTitles';
import { DvButton } from '../../../styleComponents/layout/DvButton';
import RenderCards from '../renders/RenderCards';
import StyledSpecialistWelcomeForm2 from '../../../styleComponents/StyledSpecialistWelcomeForm2'
import EdicationModal from '../../modals/EdicationModal';
import WorkExperienceModal from '../../modals/WorkExperienceModal';

class InfoForm extends Component {

    render() {
        const { submitting, educations, experiences, projectTypes, signUp, specialistData } = this.props;
        let educationsChilds1  = specialistData ? specialistData["educations"]       : [];
        let experiencesChilds1 = specialistData ? specialistData["work_experiences"] : [];

        let educationData  = [ ...educationsChilds1,  ...educations ];
        let experienceData = [ ...experiencesChilds1, ...experiences];

        let { avatar } = specialistData || false;

        return (
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <StyledSpecialistWelcomeForm2>
                                { signUp && <DvTitleSmall>Awesome! Tell us more! /</DvTitleSmall>}
                                { !avatar && <p>Upload your photo /</p>}
                                <Field
                                    name='person'
                                    component={RenderImage}
                                    type='file'
                                    avatar={avatar}
                                    placeholder='Choose your photo /'
                                />

                                <div id="professional_experience_info" className='text-area-group'>
                                    <p>Write a paragraph or two about your professional experience /</p>
                                    <Field name='professional_experience_info' component={RenderTextArea} validate={required}/>
                                </div>

                                <div>
                                    <p><b>Education</b> / List any formal education here /</p>

                                    <RenderCards
                                        educations={ educationData }
                                    />

                                    <EdicationModal/>
                                </div>

                                <div>
                                    <p><b>Work Experience</b> / Tell us about previous companies <br/>
                                        you’ve worked at, projects you’ve worked on or things <br/>
                                        you’ve built /
                                    </p>

                                    <RenderCards
                                        experiences={ experienceData }
                                    />

                                    <WorkExperienceModal/>
                                </div>

                                <div className='rate'>
                                    <p><b>Set your rate /</b></p>

                                    <div className='flex-wrapper'>
                                        <div>
                                            <p>Hourly</p>
                                            <Field
                                                name="hourly_rate"
                                                component={RenderField}
                                                type="number"
                                                placeholder="AUD $"
                                            />
                                        </div>
                                        <div>
                                            <p>Daily</p>
                                            <Field
                                                name="daily_rate"
                                                component={RenderField}
                                                type="number"
                                                placeholder="AUD $"
                                            />
                                        </div>
                                    </div>
                                </div>

                                { signUp && <Availability/> }

                                <div id="project_type" className='half-column'>
                                    <p><b>What kind of Projects are you interested in? /</b></p>
                                    <Field
                                        name="project_type"
                                        component={RenderSelect}
                                        placeholder="You can select only one"
                                        options={projectTypes}
                                        validate={[required]}
                                    />
                                </div>

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
        )
    }
}

export default InfoForm
