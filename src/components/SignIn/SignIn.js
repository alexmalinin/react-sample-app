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
import { signIn, userType } from "../../actions/actions";
import { getUserRole } from "../../helpers/functions";
import { S_PASSIVE } from "../../constans/constans";

class SignUp extends Component {
  componentWillMount() {
    this.userEmail = localStorage.getItem("user_email");
  }

  render() {
    const { signInReducer, changeUserType } = this.props;
    let { failSignIn, Loading } = signInReducer || false;
    const activeIndex = changeUserType === "Specialist" ? 0 : 1;
    let confirm = signInReducer;
    const panes = [
      {
        menuItem: "Specialist",
        render: () => (
          <StyledSignUpForm attached={false}>
            <SignInForm
              user="specialists"
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
              user="customers"
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
          <Loader loading={Loading} />
          <IntroContainer>
            <div className="perspective">
              <StyledFormHeader borderBottom>
                <div className="form-title">Sign in</div>
                <div className="form-subtitle">Welcome back!</div>
              </StyledFormHeader>
              <Tabs widthAuto action="" className="relative">
                <Tab
                  className={
                    Loading ? "loading content-loading" : "loading content-load"
                  }
                  menu={{ text: true }}
                  panes={panes}
                  activeIndex={activeIndex}
                  onTabChange={this.handleTabChange}
                />
              </Tabs>
              {confirm && this.loginRedirect()}
            </div>
          </IntroContainer>
        </S_MainContainer>
      </Fragment>
    );
  }

  loginRedirect = () => {
    let { signInReducer } = this.props;
    let { isLogIn, data } = signInReducer;
    let status = data ? data["status"] : null;
    if (isLogIn && status !== "logged") {
      return <Redirect to={`/dashboard/profile`} />;
    }

    if (status === "logged") {
      if (getUserRole() === S_PASSIVE) {
        return <Redirect to={`/dashboard/about`} />;
      } else return <Redirect to={`/dashboard/`} />;
    }
  };

  submit = values => {
    let { changeUserType } = this.props;
    let user = changeUserType === "Specialist" ? "specialist" : "customer";
    this.props.signIn(user, values);
  };

  handleTabChange = (ev, { activeIndex }) => {
    const activeTab = activeIndex === 0 ? "Specialist" : "Client";
    this.props.userType(activeTab);
  };
}

export default connect(
  ({ changeUserType, signInReducer }) => ({ changeUserType, signInReducer }),
  { signIn, userType }
)(SignUp);
