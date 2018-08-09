import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { Tab } from "semantic-ui-react";

import SignUpForm from "./SignUpForm";

import StyledFormHeader from "@styled/forms/FormHeader";
import Tabs from "@styled/Tabs";
import StyledAuthForm from "@styled/forms/AuthForm";

import { userOperations } from "@ducks/user";

class SignUpContainer extends Component {
  state = {
    activeUser: "specialist",
    errorMessage: null
  };

  static propTypes = {
    signUp: PropTypes.func.isRequired
  };

  handleTabChange = (ev, { activeIndex, panes }) => {
    this.setState({
      activeUser: panes[activeIndex].menuValue
    });
  };

  submit = values => {
    const { activeUser } = this.state;

    this.props.signUp(activeUser, values);
  };

  render() {
    const { activeUser } = this.state;
    const { handleSubmit, submitting, signUp, history } = this.props;

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

    console.log("submitting", submitting);

    return (
      <Fragment>
        <StyledFormHeader>
          <div className="form-title">Create an account</div>
          <div className="form-subtitle">
            Enter your email and start using Digital Village
          </div>
        </StyledFormHeader>

        <Tabs widthAuto action="">
          <Tab
            menu={{ text: true }}
            panes={panes}
            activeIndex={activeIndex}
            onTabChange={this.handleTabChange}
          />

          <StyledAuthForm attached={false}>
            <SignUpForm
              // failLogin={failLogin}
              handleSubmit={handleSubmit(values =>
                signUp(activeUser, values).then(response => {
                  if (response) {
                    localStorage.email = response;
                    history.push("/confirm_email");
                  }
                })
              )}
            />
          </StyledAuthForm>
        </Tabs>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  signUpFail: user.signUpFail
});

export default connect(mapStateToProps, {
  signUp: userOperations.signUp
})(
  reduxForm({
    form: "SignUpForm",
    destroyOnUnmount: true,
    forceUnregisterOnUnmount: true,
    onSubmitSuccess: (submitResult, dispatch, { history }) => {
      // history.push("/confirm_email");
    }
  })(SignUpContainer)
);
