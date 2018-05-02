import React, { Component } from "react";
import { reduxForm, Field, change, stopSubmit } from "redux-form";
import { Link } from "react-router-dom";
import { required, minLength8 } from "../../helpers/validate";
import RenderField from "../forms/renders/RenderField";
import StyledVerificationForm from "../../styleComponents/StyledVerificationForm";
import DvButtonForm from "../../styleComponents/layout/DvButtonForm";
import { SaveBtn } from "../../styleComponents/layout/DvButton";
import StyledFormHint from "../../styleComponents/forms/StyledFormHint";
import EmailField from "../forms/renders/EmailField";

class ForgotPasswordForm extends Component {
  // componentWillMount() {
  //     let { email } = this.props;
  //     if (email) {
  //         this.props.dispatch(change('SignInForm', 'email', email ))
  //     }
  // }

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <StyledVerificationForm onSubmit={handleSubmit}>
        <EmailField name="email" label="Your Email" checkedClass="checked" />

        <SaveBtn type="submit" disabled={submitting} primary>
          <span>Submit</span>
        </SaveBtn>

        {/* <DvButtonForm passwordForm
                type='submit'
                disabled={submitting}
                content='Submit'
                primary
            /> */}
      </StyledVerificationForm>
    );
  }

  // componentWillReceiveProps(nextState) {
  //     console.log(nextState);
  //     if (nextState.failSignIn) {
  //         this.props.dispatch(stopSubmit("SignInForm", {"email": 'Don\'t exist this email', "password": 'Check your password again'} ));
  //     }
  // }
}

export default reduxForm({
  form: "ForgotPasswordForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(ForgotPasswordForm);
