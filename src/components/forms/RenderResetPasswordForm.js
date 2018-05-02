import React, { Component } from "react";
import { connect } from "react-redux";
import { required } from "../../helpers/validate";
import { Field, reduxForm } from "redux-form";
import { DvButton, SaveBtn } from "../../styleComponents/layout/DvButton";
import { DvTitleSmall } from "../../styleComponents/layout/DvTitles";
import RenderField from "./renders/RenderField";
import { changePassword } from "../../actions/actions";
import { Grid, Transition } from "semantic-ui-react";

class RenderResetPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false
    };
  }

  open = () => {
    let prevState = this.state.opened;
    this.setState({
      opened: !prevState
    });
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    const { opened } = this.state;

    return (
      <form name="reset_password" onSubmit={handleSubmit(this.resetPassword)}>
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
                  component={RenderField}
                  name="password"
                  label="Password"
                  type="password"
                  validate={[required]}
                />
                <Field
                  component={RenderField}
                  name="password_confirmation"
                  label="Confirm password"
                  type="password"
                  validate={[required]}
                />
              </Grid.Column>
              <Grid.Column computer={7} />
              <Grid.Column computer={3} />
              <Grid.Column computer={3}>
                <DvButton
                  type="button"
                  disabled={submitting}
                  content="CANCEL"
                  primary
                  xsindent="true"
                  midbtn="true"
                  onClick={this.open}
                />
              </Grid.Column>
              <Grid.Column computer={3}>
                <DvButton
                  type="submit"
                  disabled={submitting}
                  content="SAVE"
                  primary
                  xsindent="true"
                  midbtn="true"
                />
              </Grid.Column>
            </Grid.Row>
          </Transition>
        </Grid>
      </form>
    );
  }

  resetPassword = passwords => {
    const { changePassword, user, reset } = this.props;
    changePassword(passwords, user);
    reset();
  };
}

RenderResetPasswordForm = reduxForm({
  form: "RenderResetPasswordForm"
})(RenderResetPasswordForm);

export default connect(null, { changePassword })(RenderResetPasswordForm);
