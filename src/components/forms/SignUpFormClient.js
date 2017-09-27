import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import SignUpForm from './SignUpForm';

const SignUpFormClient = props =>  {

    return (
        <SignUpForm {...props}/>
    )
};


export default reduxForm({
    form: 'SignUpFormClient',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(SignUpFormClient);
