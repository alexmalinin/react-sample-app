import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import RenderSignUpRadio from '../../forms/renders/RenderSignUpRadio';
import SignUpForm from '../../SignUp/SignUpForm';
import { formValueSelector } from 'redux-form';

class SignUpFormSpecialist extends Component  {

    render() {
        return (
            <SignUpForm {...this.props}>
                <Field name="person"
                       component={RenderSignUpRadio}
                       type="radio"
                       label="Individual"
                       value="Individual"

                />
                <Field name="person"
                       component={RenderSignUpRadio}
                       type="radio"
                       label="Agency"
                       value="Agency"
                />
            </SignUpForm>
        )
    }
}


SignUpFormSpecialist =  reduxForm({
    form: 'SignUpFormSpecialist',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(SignUpFormSpecialist);

const selector = formValueSelector('SignUpFormSpecialist');
SignUpFormSpecialist = connect(state => {
    const hasPerson = selector(state, 'person');
    return {
        hasPerson,

    }
})(SignUpFormSpecialist);

export default SignUpFormSpecialist

