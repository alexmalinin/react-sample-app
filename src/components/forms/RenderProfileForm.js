import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Field, reduxForm, change} from 'redux-form';
import {required} from '../../helpers/validate';
import { DvButton } from '../../styleComponents/layout/DvButton'
import InputField from './renders/InputField';
import {RenderField} from './renders/RenderField';
import EmailField from './renders/EmailField';
import StyledPhoneField from '../../styleComponents/forms/StyledPhoneField';
import RenderPhone from './renders/RenderPhone';
import RenderImage from '../forms/renders/RenderImage';
import LocationField from '../forms/renders/LocationField';
import RenderTextArea from '../forms/renders/RenderTextArea';

import RenderCards from '../specialist/renders/RenderCards';
import EdicationModal from '../modals/EdicationModal';
import WorkExperienceModal from '../modals/WorkExperienceModal';

import { Grid, Tab } from 'semantic-ui-react';

window.change = change;

// let renderErrorSpec   = true;
// let renderErrorClient = true;

class RenderProfileForm  extends Component {

    render() {

        const { handleSubmit, educations, experiences, submitting, clientData, specialistData } = this.props;
        let { avatar } = specialistData || clientData || false;
        // let renderPlaceholder = clientData ? clientData.phone_code : specialistData ? specialistData.phone_code : null;
        let educationsChilds1  = specialistData ? specialistData["educations"]       : [];
        let experiencesChilds1 = specialistData ? specialistData["work_experiences"] : [];

        let educationData  = specialistData ? [ ...educationsChilds1,  ...educations ] : null;
        let experienceData = specialistData ? [ ...experiencesChilds1, ...experiences] : null;

        return (
            <form name='account' onSubmit={handleSubmit}>

                <Grid>
                    <Grid.Row>
                        <Grid.Column computer={3}>
                            { !avatar && <p>Upload your photo</p>}
                            <Field
                                name='person'
                                component={RenderImage}
                                type='file'
                                avatar={avatar}
                                placeholder='Choose your photo'
                            />
                        </Grid.Column>
                        <Grid.Column computer={11}> 
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column computer={8}>
                                        <InputField
                                            name="first_name"
                                            label="First Name"
                                        />
                                        
                                        <InputField
                                            name="city"
                                            label="City"
                                        />
                                        <StyledPhoneField>
                                            <span>Phone</span>
                                            <RenderPhone />
                                        </StyledPhoneField>                                        
                                    </Grid.Column>
                                    <Grid.Column computer={8}>
                                        <InputField
                                            name="last_name"
                                            label="Last Name"
                                        />
                                        <InputField
                                            name="country"
                                            label="Country"
                                        />
                                        <EmailField
                                            name="email"
                                            label="Email"
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column computer={16}>
                                        <div id={specialistData ? 'professional_experience_info' : 'description'} className='text-area-group'>
                                            <Field  name={specialistData ? 'professional_experience_info' : 'description'} 
                                                    labelTextarea={'Write a paragraph or two about your professional experience '} 
                                                    component={RenderTextArea} 
                                            />
                                        </div>
                                    </Grid.Column>
                                </Grid.Row>                                
                            </Grid>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column computer={8}>
                                        <div>
                                            <RenderCards
                                                experiences={ experienceData }
                                            />
                                            <WorkExperienceModal/>
                                        </div>                                        
                                    </Grid.Column>
                                    <Grid.Column computer={8}>
                                        <div>
                                            <RenderCards
                                                educations={ educationData }
                                            />

                                            <EdicationModal/>
                                        </div>
                                    </Grid.Column>
                                </Grid.Row>                                
                            </Grid>
                        </Grid.Column>
                        <Grid.Column computer={1}>
                            <DvButton type="submit"
                                disabled={submitting}
                                content='SAVE & UPDATE'
                                primary
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>


                {/* <Grid>
                    <Grid.Row>
                        { !avatar && <p>Upload your photo</p>}
                        <Field
                            name='person'
                            component={RenderImage}
                            type='file'
                            avatar={avatar}
                            placeholder='Choose your photo'
                        />
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column mobile={16} tablet={16} computer={ specialistData ? 8 : 16 }>
                            <InputField
                                name="first_name"
                                placeholder="First Name"
                            />

                            <InputField
                                name="last_name"
                                placeholder="Last Name"
                            />

                            <StyledPhoneField>
                                <span>Phone</span>
                                <RenderPhone/>
                            </StyledPhoneField>

                            <EmailField
                                name="email"
                                placeholder="Email"
                            />

                            <LocationField />

                            <div id={specialistData ? 'professional_experience_info' : 'description'} className='text-area-group'>
                              <p>Write a paragraph or two about your professional experience /</p>
                              <Field name={specialistData ? 'professional_experience_info' : 'description'} component={RenderTextArea} />
                            </div>

                        </Grid.Column>
                          {
                            specialistData ?
                            <Grid.Column computer={8} >
                              <Grid.Column mobile={16} tablet={8} computer={4}>
                                <div>
                                  <RenderCards
                                    educations={ educationData }
                                  />

                                  <EdicationModal/>
                                </div>
                              </Grid.Column>
                              <Grid.Column mobile={16} tablet={8} computer={4}>
                                <div>
                                  <RenderCards
                                    experiences={ experienceData }
                                  />

                                  <WorkExperienceModal/>
                                </div>
                              </Grid.Column>
                            </Grid.Column> : null
                          }
                    </Grid.Row>

                    
                </Grid> */}
            </form>
        )
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.anyTouched) {
            return false
        } else {
            return true
        }
    }

    componentWillUpdate(nextProps) {
        if (nextProps.clientData) {
            // if (renderErrorSpec) {
                this.fillFields(nextProps.clientData);
                // renderErrorSpec = false;
            // }
        } else if (nextProps.specialistData) {
            // if (renderErrorClient) {
                this.fillFields(nextProps.specialistData);
                // renderErrorClient = false;
            // }
        }
    }


    fillFields = data => {
        let { first_name, last_name, email, address, phone_code, phone_number,
          professional_experience_info, description, clearPassword, avatar} = data;

        // console.log('country', address.country);
        // this.props.dispatch(change('RenderProfileForm', 'avatar',       avatar));
        this.props.dispatch(change('RenderProfileForm', 'first_name',   first_name));
        this.props.dispatch(change('RenderProfileForm', "last_name" ,   last_name));
        this.props.dispatch(change('RenderProfileForm', 'email',        email));
        this.props.dispatch(change('RenderProfileForm', 'phone_code',   {'label':phone_code, 'name':phone_code}));
        this.props.dispatch(change('RenderProfileForm', 'phone_number', phone_number));
        this.props.dispatch(change('RenderProfileForm', 'country',      address ? address.country : null));
        this.props.dispatch(change('RenderProfileForm', 'city',         address ? address.city : null));
        this.props.dispatch(change('RenderProfileForm', 'description',  description));
        this.props.dispatch(change('RenderProfileForm', 'professional_experience_info',  professional_experience_info));
    }
};

RenderProfileForm = reduxForm({
    form: 'RenderProfileForm'
})(RenderProfileForm);

export default connect( ({clientData, specialistData}) => ({clientData, specialistData}))(RenderProfileForm);
