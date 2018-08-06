import React, { Component } from "react";
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
    activeUser: "specialist"
  };

  static propTypes = {
    signUp: PropTypes.func.isRequired
  };

  handleTabChange = (ev, { activeIndex, panes }) => {
    this.setState({
      activeUser: panes[activeIndex].menuItem
    });
  };

  submit = values => {
    const { activeUser } = this.state;

    this.props.signUp(activeUser, values);
  };

  render() {
    const { handleSubmit } = this.props;
    const { activeUser } = this.state;

    const activeIndex = activeUser === "specialist" ? 0 : 1;

    const panes = [
      {
        menuItem: "specialist",
        render: () => (
          <StyledAuthForm attached={false}>
            <SignUpForm
              // person={changeUserType}
              // failLogin={failLogin}
              // Loading={Loading}
              handleSubmit={handleSubmit(this.submit)}
            />
          </StyledAuthForm>
        )
      },
      {
        menuItem: "customer",
        render: () => (
          <StyledAuthForm attached={false}>
            <SignUpForm
              // person={changeUserType}
              // failLogin={failLogin}
              handleSubmit={handleSubmit(this.submit)}
            />
          </StyledAuthForm>
        )
      }
    ];

    return (
      <div>
        <StyledFormHeader>
          <div className="form-title">Create an account</div>
          <div className="form-subtitle">
            Enter your email and start using Digital Village
          </div>
        </StyledFormHeader>

        <Tabs widthAuto action="">
          <Tab
            // className={
            //   Loading ? "loading content-loading" : "loading content-load"
            // }
            menu={{ text: true }}
            panes={panes}
            activeIndex={activeIndex}
            onTabChange={this.handleTabChange}
          />
        </Tabs>
      </div>
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
      history.push("/confirm_email");
    }
  })(SignUpContainer)
);
