import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { Tab } from "semantic-ui-react";

import SignInForm from "./SignInForm";

import StyledFormHeader from "@styled/forms/FormHeader";
import Tabs from "@styled/Tabs";
import StyledAuthForm from "@styled/forms/AuthForm";

import { userOperations } from "@ducks/user";
import { SPECIALIST, CLIENT } from "@utilities/constants";

class SignInContainer extends Component {
  state = {
    activeUser: this.props.usertype
  };

  static propTypes = {
    usertype: PropTypes.string,
    signInFail: PropTypes.bool,
    login: PropTypes.func.isRequired
  };

  static defaultProps = {
    usertype: "specialist",
    signInFail: false
  };

  handleTabChange = (ev, { activeIndex, panes }) => {
    this.setState({
      activeUser: panes[activeIndex].menuItem
    });
  };

  submit = values => {
    this.props.login(this.state.activeUser, values);
  };

  render() {
    const { handleSubmit, signInFail } = this.props;
    const { activeUser } = this.state;

    const activeIndex = activeUser === "specialist" ? 0 : 1;

    const panes = [
      {
        menuItem: "specialist",
        render: () => (
          <StyledAuthForm attached={false}>
            <SignInForm
              user="specialist"
              signInFail={signInFail}
              handleSubmit={handleSubmit(this.submit)}
            />
          </StyledAuthForm>
        )
      },
      {
        menuItem: "customer",
        render: () => (
          <StyledAuthForm attached={false}>
            <SignInForm
              user="customer"
              signInFail={signInFail}
              handleSubmit={handleSubmit(this.submit)}
            />
          </StyledAuthForm>
        )
      }
    ];

    return (
      <div>
        <StyledFormHeader borderBottom>
          <div className="form-title">Sign in</div>
          <div className="form-subtitle">Welcome back!</div>
        </StyledFormHeader>

        <Tabs widthAuto action="" className="relative">
          <Tab
            // className={
            //   loading ? "loading content-loading" : "loading content-load"
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
  usertype: user.type,
  signInFail: user.signInFail
});

export default connect(mapStateToProps, {
  login: userOperations.login
})(
  reduxForm({
    form: "SignInForm",
    destroyOnUnmount: true,
    forceUnregisterOnUnmount: true
  })(SignInContainer)
);
