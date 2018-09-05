import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Tab } from "semantic-ui-react";
import HeaderIntro from "../layout/HeaderIntro";
import { S_MainContainer } from "view/styleComponents/layout/S_MainContainer";
import { IntroContainer } from "view/styleComponents/layout/Container";
import Loader from "../layout/Loader";
import StyledSignUpForm from "view/styleComponents/StyledSignUpForm";
import StyledFormHeader from "view/styleComponents/StyledFormHeader";
import Tabs from "view/styleComponents/Tabs";
import SignInForm from "./SignInForm";
// import { signIn as sds, userType } from "../../actions/actions";
import { signInOperations } from "state/ducks/signIn";

import { S_PASSIVE } from "utilities/constants";

class SignUp extends Component {
  state = { activeIndex: 0 };

  componentDidMount() {
    document.title = "Sign In | Digital Village";
    this.userEmail = localStorage.getItem("user_email");
  }

  loginRedirect = () => {
    const {
      location,
      history,
      location: { state },
      signInReducer: { status, isLogIn, auth }
    } = this.props;

    let { role } = auth;

    if (isLogIn) {
      if (status !== "logged") {
        return <Redirect to={`/profile/info`} />;
      }

      if (status === "logged") {
        if (role === S_PASSIVE) {
          return <Redirect to={`/dashboard/about`} />;
        } else {
          if (state && state.from) {
            return (
              <Redirect
                to={{
                  pathname: state.from.pathname,
                  from: location
                }}
              />
            );
          } else {
            return <Redirect to={`/dashboard/`} />;
          }
        }
      }
    }
  };

  handleTabChange = (ev, { activeIndex }) => {
    // const activeTab = activeIndex === 0 ? "Specialist" : "Client";
    // this.props.userType(activeTab);
    this.setState({
      activeIndex
    });
  };

  submit = values => {
    const { changeUserType } = this.props;
    const { activeIndex } = this.state;
    let user = activeIndex === 0 ? "specialist" : "customer";
    console.log("signIn", user, values);
    this.props.signIn(user, values);
  };

  render() {
    const {
      signInReducer: { isLogIn, status, logged, failSignIn, loading }
    } = this.props;

    const { activeIndex } = this.state;

    console.log(this.props);

    const panes = [
      {
        menuItem: "Specialist",
        render: () => (
          <StyledSignUpForm attached={false}>
            <SignInForm
              user="specialist"
              email={this.userEmail}
              failSignIn={failSignIn}
              onSubmit={this.submit}
            />
          </StyledSignUpForm>
        )
      },
      {
        menuItem: "Client",
        render: () => (
          <StyledSignUpForm attached={false}>
            <SignInForm
              user="customer"
              email={this.userEmail}
              failSignIn={failSignIn}
              onSubmit={this.submit}
            />
          </StyledSignUpForm>
        )
      }
    ];

    return (
      <Fragment>
        <HeaderIntro />
        <S_MainContainer>
          <Loader loading={loading} />
          <IntroContainer>
            <div className="perspective">
              <StyledFormHeader borderBottom>
                <div className="form-title">Sign in</div>
                <div className="form-subtitle">Welcome back!</div>
              </StyledFormHeader>
              <Tabs widthAuto action="" className="relative">
                <Tab
                  className={
                    loading ? "loading content-loading" : "loading content-load"
                  }
                  menu={{ text: true }}
                  panes={panes}
                  activeIndex={activeIndex}
                  onTabChange={this.handleTabChange}
                />
              </Tabs>
              {isLogIn && this.loginRedirect()}
            </div>
          </IntroContainer>
        </S_MainContainer>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    changeUserType: state.changeUserType,
    signInReducer: state.signIn
  };
};

export default connect(mapStateToProps, {
  signIn: signInOperations.signIn
})(SignUp);
