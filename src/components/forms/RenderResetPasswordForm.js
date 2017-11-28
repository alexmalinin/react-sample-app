import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Field, reduxForm} from 'redux-form';
import { DvButton } from '../../styleComponents/layout/DvButton'
import {RenderField} from './renders/RenderField';
import { changePassword } from "../../actions/actions";

class RenderResetPasswordForm  extends Component {

    render() {
        const { handleSubmit, submitting } = this.props;

        return (
            <form name='reset_password' onSubmit={handleSubmit(this.resetPassword)}>
                <Field
                    component={RenderField}
                    name='password'
                    placeholder='Password /'
                    type='password'

                />
                <Field
                    component={RenderField}
                    name='password_confirmation'
                    placeholder='Confirm password /'
                    type='password'
                />

                <DvButton type="submit"
                          disabled={submitting}
                          content='SAVE & UPDATE'
                          primary
                />
            </form>
        )
    }

    resetPassword = passwords => {
        const {changePassword, user, reset } = this.props;
        changePassword(passwords, user);
        reset();
    }
}

RenderResetPasswordForm = reduxForm({
    form: 'RenderResetPasswordForm',
})(RenderResetPasswordForm);

export default connect(null, {changePassword})(RenderResetPasswordForm);
