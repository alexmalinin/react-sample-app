import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Tab } from "semantic-ui-react";
import HeaderIntro from "../layout/HeaderIntro";
import { S_MainContainer } from "../../styleComponents/layout/S_MainContainer";
import { IntroContainer } from "../../styleComponents/layout/Container";
import Loader from "../layout/Loader";
import StyledSignUpForm from "../../styleComponents/StyledSignUpForm";
import StyledFormHeader from "../../styleComponents/StyledFormHeader";
import Tabs from "../../styleComponents/Tabs";
import SignInForm from "./SignInForm";
import { signIn as sds, userType } from "../../actions/actions";
import { signInOperations } from "../../state/ducks/signIn";
import { getUserRole } from "../../helpers/functions";
import { S_PASSIVE } from "../../constants/user";

class SignUp extends Component {
  componentWillMount() {
    document.title = "Sign In | Digital Village";
    this.userEmail = localStorage.getItem("user_email");
  }

  loginRedirect = () => {
    let {
      auth,
      location,
      location: { state }
    } = this.props;

    let { isLogIn, data } = auth;
    let status = data ? data["status"] : null;

    if (isLogIn) {
      if (status !== "logged") {
        return <Redirect to={`/profile/info`} />;
      }

      if (status === "logged") {
        if (getUserRole() === S_PASSIVE) {
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
    const activeTab = activeIndex === 0 ? "Specialist" : "Client";
    this.props.userType(activeTab);
  };

  submit = values => {
    let { changeUserType } = this.props;
    let user = changeUserType === "Specialist" ? "specialist" : "customer";
    this.props.signIn(user, values);
  };

  render() {
    const {
      signIn: { userType, logged, failSignIn, loading }
    } = this.props;

    const activeIndex = userType === "Specialist" ? 0 : 1;
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
              {logged && this.loginRedirect()}
            </div>
          </IntroContainer>
        </S_MainContainer>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    changeUserType: state.signIn.userType,
    signIn: state.signIn
  };
};

export default connect(mapStateToProps, {
  signIn: signInOperations.signIn
})(SignUp);
