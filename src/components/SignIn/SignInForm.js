import React, { Component } from "react";
import { reduxForm, Field, change } from "redux-form";
import { NavLink } from "react-router-dom";
import { Message } from "semantic-ui-react";

import RenderField from "../forms/renders/RenderField";
import { DvButtonBlue } from "../../styleComponents/layout/DvButton";
import StyledFormHint from "../../styleComponents/forms/StyledFormHint";
import EmailField from "../forms/renders/EmailField";

import { required, minLength8 } from "../../helpers/validate";

class SignInForm extends Component {
  state = {
    visibleError: false
  };

  componentWillMount() {
    let { email } = this.props;
    if (email) {
      this.props.dispatch(change("SignInForm", "email", email));
    }
  }

  render() {
    const { handleSubmit, submitting, user } = this.props;
    const { visibleError } = this.state;

    return (
      <form onSubmit={handleSubmit}>
        {visibleError && (
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

  renderError = visible => () => {
    this.setState({ visibleError: visible });
  };

  componentWillReceiveProps(nextState) {
    if (nextState.failSignIn) {
      this.renderError(true)();
    }
  }
}

export default reduxForm({
  form: "SignInForm",
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true
})(SignInForm);
