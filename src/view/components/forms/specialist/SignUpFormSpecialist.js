import React, { Component } from "react";
import { reduxForm, stopSubmit } from "redux-form";
import SignUpForm from "view/components/signUp/SignUpForm";

let renderErrror = true;

class SignUpFormSpecialist extends Component {
  render() {
    return <SignUpForm {...this.props} />;
  }

  componentWillReceiveProps(nextState) {
    if (renderErrror) {
      if (nextState.failLogin && !nextState.Loading) {
        renderErrror = false;
        this.props.dispatch(
          stopSubmit("SignUpFormSpecialist", {
            email: "Email has already been taken"
          })
        );
      }
    }
  }
}

SignUpFormSpecialist = reduxForm({
  form: "SignUpFormSpecialist",
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true
})(SignUpFormSpecialist);

export default SignUpFormSpecialist;
