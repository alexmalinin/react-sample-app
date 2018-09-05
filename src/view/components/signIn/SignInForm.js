import React, { Component } from "react";
import { reduxForm, Field, change } from "redux-form";
import { NavLink } from "react-router-dom";
import { Message } from "semantic-ui-react";

import EmailField from "../forms/renders/EmailField";
import RenderField from "../forms/renders/RenderField";

import { required, minLength8 } from "../../utils/validate";

import { DvButtonBlue } from "../../styleComponents/layout/DvButton";
import StyledFormHint from "../../styleComponents/forms/StyledFormHint";

class SignInForm extends Component {
  componentWillMount() {
    let { email } = this.props;
    if (email) {
      this.props.dispatch(change("SignInForm", "email", email));
    }
  }

  render() {
    const { handleSubmit, submitting, user, failSignIn } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        {failSignIn && (
          <Message floating negative style={{ marginBottom: "25px" }}>
            Incorrect email or password.
          </Message>
        )}
        <EmailField name="email" label="Your email" checkedClass="checked" />
        <Field
          component={RenderField}
          checkedClass="checked"
          name="password"
          label="Password"
          type="password"
          validate={[required, minLength8]}
        />
        <StyledFormHint>
          <NavLink onClick={this.handleReset(user)} to="/forgot_password">
            Forgot password?
          </NavLink>
        </StyledFormHint>

        <div className="controls">
          <DvButtonBlue type="submit" className="dv-blue" disabled={submitting}>
            Sign In
          </DvButtonBlue>
        </div>
      </form>
    );
  }

  handleReset = user => () => {
    sessionStorage.setItem("user", user);
  };
}

export default reduxForm({
  form: "SignInForm",
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true
})(SignInForm);
