import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Transition } from "semantic-ui-react";
import { reduxForm, Form, Field } from "redux-form";

import { DvBlueButton } from "@styled/DVButton";

import InputField from "@UI/inputs/InputField";
import { DvTitleSmall } from "@styled/Titles";

import { changePassword } from "@ducks/user/actions";
import { required } from "@views/utils/validate";

class ResetPasswordForm extends Component {
  state = {
    opened: false
  };

  open = () => {
    let prevState = this.state.opened;
    this.setState({
      opened: !prevState
    });
  };

  resetPassword = passwords => {
    const { changePassword } = this.props;

    changePassword(passwords);
    this.props.reset();
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    const { opened } = this.state;

    return (
      <Form name="reset_password" onSubmit={handleSubmit(this.resetPassword)}>
        <Grid>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={12} computer={3} />
            <Grid.Column mobile={16} tablet={12} computer={10}>
              <DvTitleSmall fz="28" asButton xsCenter onClick={this.open}>
                Change Password
              </DvTitleSmall>
            </Grid.Column>
          </Grid.Row>
          <Transition
            visible={opened}
            animation="fade down"
            duration={500}
            unmountOnHide={true}
          >
            <Grid.Row>
              <Grid.Column computer={3} />
              <Grid.Column computer={6}>
                <Field
                  name="password"
                  type="password"
                  label="Password"
                  component={InputField}
                  validate={[required]}
                />
                <Field
                  name="password_confirmation"
                  type="password"
                  label="Confirm password"
                  component={InputField}
                  validate={[required]}
                />
              </Grid.Column>
              <Grid.Column computer={7} />
              <Grid.Column computer={3} />
              <Grid.Column computer={3}>
                <DvBlueButton
                  type="button"
                  disabled={submitting}
                  className="dv-blue"
                  onClick={this.open}
                >
                  Cancel
                </DvBlueButton>
              </Grid.Column>
              <Grid.Column computer={3}>
                <DvBlueButton
                  type="submit"
                  disabled={submitting}
                  className="dv-blue"
                >
                  SAVE
                </DvBlueButton>
              </Grid.Column>
            </Grid.Row>
          </Transition>
        </Grid>
      </Form>
    );
  }
}

const withForm = reduxForm({
  form: "ResetPasswordForm"
});

export default connect(null, { changePassword })(withForm(ResetPasswordForm));
