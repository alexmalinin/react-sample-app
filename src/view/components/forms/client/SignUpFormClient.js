import React, { Component } from "react";
import { Field, reduxForm, stopSubmit } from "redux-form";
import SignUpForm from "view/components/signUp/SignUpForm";

let renderErrror = true;

class SignUpFormClient extends Component {
  render() {
    return <SignUpForm {...this.props} />;
  }

  componentWillReceiveProps(nextState) {
    if (renderErrror) {
      if (nextState.failLogin) {
        renderErrror = false;
        this.props.dispatch(
          stopSubmit("SignUpFormClient", {
            email: "Email has already been taken"
          })
        );
      }
    }
  }
}

export default reduxForm({
  form: "SignUpFormClient",
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true
})(SignUpFormClient);
