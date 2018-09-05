import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

import StyledFormHeader from "@styled/forms/FormHeader";
import ResetPasswordForm from "@views/components/common/forms/VerificationForm";

import { createNotification } from "@utilities";
import { validatePasswords } from "@views/utils/validate";
import { getPasswordsForResetPassword } from "@ducks/user/actions";

class ResetPassword extends Component {
  componentDidMount() {
    const {
      location: { state }
    } = this.props;

    this.token = state.token;
    this.user = state.user;
  }

  submit = passwords => {
    const { history, getPasswordsForResetPassword } = this.props;

    return getPasswordsForResetPassword(passwords, this.user, this.token)
      .then(() => history.push("/sign_in"))
      .catch(error => {
        createNotification({
          type: "error",
          text: "Link has expired"
        });
      });
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <Fragment>
        <StyledFormHeader borderBottom>
          <div className="form-title">Reset Password</div>
        </StyledFormHeader>

        <ResetPasswordForm
          {...this.props}
          handleSubmit={handleSubmit(this.submit)}
        />
      </Fragment>
    );
  }
}

const withForm = reduxForm({
  form: "ResetPasswordForm",
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  validate: validatePasswords
});

export default connect(null, {
  getPasswordsForResetPassword
})(withForm(ResetPassword));
