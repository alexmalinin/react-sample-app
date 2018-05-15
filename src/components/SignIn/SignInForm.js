import React, { Component } from "react";
import { reduxForm, Field, change } from "redux-form";
import { Link } from "react-router-dom";
import { required, minLength8 } from "../../helpers/validate";
import RenderField from "../forms/renders/RenderField";
import DvButtonForm from "../../styleComponents/layout/DvButtonForm";
import { SaveBtn } from "../../styleComponents/layout/DvButton";
import StyledFormHint from "../../styleComponents/forms/StyledFormHint";
import EmailField from "../forms/renders/EmailField";
import { Message } from "semantic-ui-react";

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
            {/*<S_DeleteCard color='red' className="remove icon" onClick={this.renderError(false)}/>*/}
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
          <Link onClick={this.handleReset(user)} to="/forgot_password">
            Forgot password?
          </Link>
        </StyledFormHint>

        {/*<DvButtonForm
                    type="submit"
                    disabled={submitting}
                    content='Login'
                    primary
                /> */}
        <SaveBtn
          type="submit"
          className="login-button"
          disabled={submitting}
          // content=''
          primary
        >
          <span>Sign In</span>
        </SaveBtn>
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
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(SignInForm);
