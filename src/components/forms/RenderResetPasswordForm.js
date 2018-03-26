import React, { Component } from 'react';
import { connect } from 'react-redux'
import { required } from "../../helpers/validate";
import {Field, reduxForm} from 'redux-form';
import { DvButton, SaveBtn } from '../../styleComponents/layout/DvButton'
import RenderField from './renders/RenderField';
import { changePassword } from "../../actions/actions";
import { Grid } from 'semantic-ui-react';

class RenderResetPasswordForm  extends Component {

    render() {
        const { handleSubmit, submitting } = this.props;

        return (
            <form name='reset_password' onSubmit={handleSubmit(this.resetPassword)}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column computer={3}>
                        </Grid.Column>
                        <Grid.Column computer={10}>
                            <Field
                                component={RenderField}
                                name='password'
                                label='Password'
                                type='password'
                                validate={[required]}
                            />
                            <Field
                                component={RenderField}
                                name='password_confirmation'
                                label='Confirm password'
                                type='password'
                                validate={[required]}
                            />
                        </Grid.Column>
                        <Grid.Column computer={3}>
                            <SaveBtn type="submit"
                                    disabled={submitting}
                                    content=''
                                    primary
                                    updateBtn
                            >
                            <span>SAVE & UPDATE</span>
                            </SaveBtn>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
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
