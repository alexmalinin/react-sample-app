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

window.change = change;

// let renderErrorSpec   = true;
// let renderErrorClient = true;

class RenderProfileForm  extends Component {

    render() {

        const { handleSubmit, submitting, clientData, specialistData } = this.props;
        // let renderPlaceholder = clientData ? clientData.phone_code : specialistData ? specialistData.phone_code : null;

        return (
            <form onSubmit={handleSubmit}>
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

                <Field
                    component={RenderField}
                    name="password"
                    placeholder="Password /"
                    type="password"
                    validate={[required]}
                />

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
        let { first_name, last_name, email, address, phone_code, phone_number } = data;
        this.props.dispatch(change('RenderProfileForm', 'first_name',   first_name));
        this.props.dispatch(change('RenderProfileForm', "last_name" ,   last_name));
        this.props.dispatch(change('RenderProfileForm', 'email',        email));
        this.props.dispatch(change('RenderProfileForm', 'phone_code',   {'label':phone_code, 'name':phone_code}));
        this.props.dispatch(change('RenderProfileForm', 'phone_number', +phone_number));
    }
};

RenderProfileForm = reduxForm({
    form: 'RenderProfileForm'
})(RenderProfileForm);

export default connect( ({clientData, specialistData}) => ({clientData, specialistData}))(RenderProfileForm);
