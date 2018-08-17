import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { reduxForm, SubmissionError } from "redux-form";
import { Tab } from "semantic-ui-react";

import SignUpForm from "./SignUpForm";

import StyledFormHeader from "@styled/forms/FormHeader";
import StyledTabs from "@styled/StyledTabs";
import StyledAuthForm from "@styled/forms/AuthForm";

import { userOperations } from "@ducks/user";

class SignUpContainer extends Component {
  state = {
    activeUser: "specialist"
  };

  static propTypes = {
    signUp: PropTypes.func.isRequired
  };

  handleTabChange = (ev, { activeIndex, panes }) => {
    this.setState({
      activeUser: panes[activeIndex].menuValue
    });
  };

  render() {
    const { activeUser, errorMessage } = this.state;
    const { handleSubmit, signUp, history } = this.props;

    const panes = [
      {
        menuItem: "specialist",
        menuValue: "specialist"
      },
      {
        menuItem: "client",
        menuValue: "customer"
      }
    ];

    const activeIndex = activeUser === "specialist" ? 0 : 1;

    return (
      <Fragment>
        <StyledFormHeader>
          <div className="form-title">Create an account</div>
          <div className="form-subtitle">
            Enter your email and start using Digital Village
          </div>
        </StyledFormHeader>

        <StyledTabs widthAuto action="">
          <Tab
            menu={{ text: true }}
            panes={panes}
            activeIndex={activeIndex}
            onTabChange={this.handleTabChange}
          />

          <StyledAuthForm attached={false}>
            <SignUpForm
              signUpFail={errorMessage}
              handleSubmit={handleSubmit((values, dispatch, props) =>
                signUp(activeUser, values)
                  .then(({ data }) => {
                    localStorage.user_email = data.email;
                    history.push("/confirm_email");
                  })
                  .catch(({ response: { data } }) => {
                    throw new SubmissionError({
                      email: data.errors[0]
                    });
                  })
              )}
            />
          </StyledAuthForm>
        </StyledTabs>
      </Fragment>
    );
  }
}

export default connect(null, {
  signUp: userOperations.signUp
})(
  reduxForm({
    form: "SignUpForm",
    destroyOnUnmount: true,
    forceUnregisterOnUnmount: true
  })(SignUpContainer)
);
