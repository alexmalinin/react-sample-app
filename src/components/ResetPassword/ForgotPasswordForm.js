import React, { Component, Fragment } from "react";
import { reduxForm } from "redux-form";
import StyledVerificationForm from "../../styleComponents/StyledVerificationForm";
import { DvButtonBlue } from "../../styleComponents/layout/DvButton";
import EmailField from "../forms/renders/EmailField";

class ForgotPasswordForm extends Component {
  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <StyledVerificationForm onSubmit={handleSubmit}>
        <EmailField name="email" label="Your Email" checkedClass="checked" />

        <div className="controls">
          <DvButtonBlue type="submit" className="dv-blue" disabled={submitting}>
            Submit
          </DvButtonBlue>
        </div>
      </StyledVerificationForm>
    );
  }
}

export default reduxForm({
  form: "ForgotPasswordForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  initialValues: {
    email: localStorage.getItem("user_email")
  }
})(ForgotPasswordForm);
