import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Route, Redirect } from "react-router";
import { Grid, Tab } from "semantic-ui-react";
import HeaderIntro from "../layout/HeaderIntro";
import Loader from "../layout/Loader";
import { S_MainContainer } from "../../styleComponents/layout/S_MainContainer";
import { IntroContainer } from "../../styleComponents/layout/Container";
import DvGrid from "../../styleComponents/layout/DvGrid";
import StyledFormHeader from "../../styleComponents/StyledFormHeader";
import { DvTitleBig } from "../../styleComponents/layout/DvTitles";
import StyledSignUpForm from "../../styleComponents/StyledSignUpForm";
import Tabs from "../../styleComponents/Tabs";
import { postSignUpData, userType } from "../../actions/actions";
import SignUpFormSpecialist from "../specialist/forms/SignUpFormSpecialist";
import SignUpFormClient from "../client/forms/SignUpFormClient";
import StyledFormHint from "../../styleComponents/forms/StyledFormHint";
import { run } from "../../helpers/scrollToElement";

class SignUp extends Component {
  state = {
    confirm: false
  };

  componentWillMount() {
    // localStorage.removeItem("user_email");
    run(0)();
    this.setState({
      confirm: false
    });
  }

  render() {
    let { confirm } = this.state;
    const { changeUserType, signUpData } = this.props;
    let { failLogin, Loading } = signUpData || false;
    const activeIndex = changeUserType === "Specialist" ? 0 : 1;
    const panes = [
      {
        menuItem: "Specialist",
        render: () => (
          <StyledSignUpForm attached={false}>
            <SignUpFormSpecialist
              person={changeUserType}
              failLogin={failLogin}
              Loading={Loading}
              onSubmit={this.submit("specialists")}
            />
          </StyledSignUpForm>
        )
      },
      {
        menuItem: "Client",
        render: () => (
          <StyledSignUpForm attached={false}>
            <SignUpFormClient
              person={changeUserType}
              failLogin={failLogin}
              onSubmit={this.submit("customers")}
            />
          </StyledSignUpForm>
        )
      }
    ];

    window.state = this.state;

    return (
      <div>
        <HeaderIntro />
        <S_MainContainer>
          <Loader loading={Loading} />
          <IntroContainer>
            <div className="perspective">
              <StyledFormHeader>
                <div className="form-title">Create an account</div>
                <div className="form-subtitle">
                  Enter your email and start using Digital Village
                </div>
              </StyledFormHeader>
              <Tabs mTop="180" widthAuto action="">
                <Tab
                  className={
                    Loading ? "loading content-loading" : "loading content-load"
                  }
                  menu={{ text: true }}
                  panes={panes}
                  activeIndex={activeIndex}
                  onTabChange={this.handleTabChange}
                />
                {confirm && <Redirect to="/confirm_email" />}
              </Tabs>
            </div>
          </IntroContainer>
        </S_MainContainer>
      </div>
    );
  }

  // redirect = ref => {
  //     let a = ref ? ref.querySelector('a') : null;
  //     a ? a.click() : null;
  // };

  submit = userType => values => {
    this.props.postSignUpData(userType, values);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.signUpData) {
      if (nextProps.signUpData.id) {
        this.setState({
          confirm: !this.state.confirm
        });
      }
    }
  }

  handleTabChange = (ev, { activeIndex }) => {
    const activeTab = activeIndex === 0 ? "Specialist" : "Client";
    this.props.userType(activeTab);
  };
}

export default connect(
  ({ form, changeUserType, signUpData }) => ({
    form,
    changeUserType,
    signUpData
  }),
  {
    userType,
    postSignUpData
  }
)(SignUp);
