import React, { Component } from "react";
import { reduxForm } from "redux-form";
import StyledVerificationForm from "../../styleComponents/StyledVerificationForm";
import { SaveBtn } from "../../styleComponents/layout/DvButton";
import EmailField from "../forms/renders/EmailField";

class ForgotPasswordForm extends Component {
  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <StyledVerificationForm onSubmit={handleSubmit}>
        <EmailField name="email" label="Your Email" checkedClass="checked" />

        <div className="btn-wrap">
          <SaveBtn type="submit" disabled={submitting} primary>
            <span>Submit</span>
          </SaveBtn>
        </div>
      </StyledVerificationForm>
    );
  }
}

export default reduxForm({
  form: "ForgotPasswordForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(ForgotPasswordForm);
