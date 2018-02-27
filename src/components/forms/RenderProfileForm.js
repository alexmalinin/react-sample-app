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

window.change = change;

// let renderErrorSpec   = true;
// let renderErrorClient = true;

class RenderProfileForm  extends Component {

    render() {

        const { handleSubmit, educations, experiences, submitting, clientData, specialistData } = this.props;
        let { avatar } = specialistData || false;
        // let renderPlaceholder = clientData ? clientData.phone_code : specialistData ? specialistData.phone_code : null;

        // let educationsChilds1  = specialistData ? specialistData["educations"]       : [];
        // let experiencesChilds1 = specialistData ? specialistData["work_experiences"] : [];
        //
        // let educationData  = [ ...educationsChilds1,  ...educations ];
        // let experienceData = [ ...experiencesChilds1, ...experiences];

        return (
            <form name='account' onSubmit={handleSubmit}>

                { !avatar && <p>Upload your photo /</p>}
                <Field
                  name='person'
                  component={RenderImage}
                  type='file'
                  avatar={avatar}
                  placeholder='Choose your photo /'
                />

                <InputField
                    name="first_name"
                    placeholder="First Name /"
                />

                <InputField
                    name="last_name"
                    placeholder="Last Name /"
                />

                <StyledPhoneField>
                    <span>Phone /</span>
                    <RenderPhone/>
                </StyledPhoneField>

                <EmailField
                    name="email"
                    placeholder="Email /"
                />

                <LocationField />

                <div id="professional_experience_info" className='text-area-group'>
                  <p>Write a paragraph or two about your professional experience /</p>
                  <Field name='professional_experience_info' component={RenderTextArea} />
                </div>

                <DvButton type="submit"
                            disabled={submitting}
                            content='SAVE & UPDATE'
                            primary
                  />
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
          professional_experience_info, clearPassword, avatar} = data;

        // console.log('country', address.country);
        // this.props.dispatch(change('RenderProfileForm', 'avatar',       avatar));
        this.props.dispatch(change('RenderProfileForm', 'first_name',   first_name));
        this.props.dispatch(change('RenderProfileForm', "last_name" ,   last_name));
        this.props.dispatch(change('RenderProfileForm', 'email',        email));
        this.props.dispatch(change('RenderProfileForm', 'phone_code',   {'label':phone_code, 'name':phone_code}));
        this.props.dispatch(change('RenderProfileForm', 'phone_number', phone_number));
        this.props.dispatch(change('RenderProfileForm', 'country',     address ? address.country : null));
        this.props.dispatch(change('RenderProfileForm', 'city',        address ? address.city : null));
        this.props.dispatch(change('RenderProfileForm', 'professional_experience_info',  professional_experience_info));
    }
};

RenderProfileForm = reduxForm({
    form: 'RenderProfileForm'
})(RenderProfileForm);

export default connect( ({clientData, specialistData}) => ({clientData, specialistData}))(RenderProfileForm);
