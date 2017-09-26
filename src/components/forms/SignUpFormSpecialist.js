import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import RenderRadio from './RenderRadio';
import SignUpForm from './SignUpForm';
import { formValueSelector } from 'redux-form';

class SignUpFormSpecialist extends Component  {

    render() {
        return (
            <SignUpForm {...this.props}>
                <Field name="person"
                       component={RenderRadio}
                       type="radio"
                       label="Specialist"
                       value="Specialist"

                />
                <Field name="person"
                       component={RenderRadio}
                       type="radio"
                       label="Agency"
                       value="Agency"
                />
            </SignUpForm>
        )
    }
}


SignUpFormSpecialist =  reduxForm({
    form: 'SignUpFormSpecialist' // a unique identifier for this form
})(SignUpFormSpecialist);

const selector = formValueSelector('SignUpFormSpecialist');
SignUpFormSpecialist = connect(state => {
    // can select values individually
    const hasPerson = selector(state, 'person')
    return {
        hasPerson,

    }
})(SignUpFormSpecialist);

export default SignUpFormSpecialist

