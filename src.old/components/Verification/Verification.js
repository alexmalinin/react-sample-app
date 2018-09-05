import React, { Component, Fragment } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { NotificationContainer } from "react-notifications";
import HeaderIntro from "../layout/HeaderIntro";
import { S_MainContainer } from "../../styleComponents/layout/S_MainContainer";
import StyledFormHeader from "../../styleComponents/StyledFormHeader";
import DvForm from "../../styleComponents/Tabs";
import confirm from "../../decorators/confirm";
import VerificationForm from "./VerificationForm";
import { IntroContainer } from "../../styleComponents/layout/Container";
import {
  verifyPassword,
  getUserId,
  userType,
  deleteConfirmationToken
} from "../../actions/actions";

class Verification extends Component {
  componentWillMount() {
    let { match } = this.props;
    this.token = match.params.token;
    this.user = match.params.user;
    this.props.getUserId(this.user, this.token);
  }

  componentDidMount() {
    let tab = this.user === "customer" ? "Client" : "Specialist";
    this.props.userType(tab);
  }

  render() {
    const { confirmPassword } = this.props;
    return (
      <Fragment>
        <HeaderIntro />
        <S_MainContainer>
          <IntroContainer>
            <StyledFormHeader borderBottom>
              <div className="form-title">Create your password</div>
              <div className="form-subtitle">Account Verified</div>
            </StyledFormHeader>

            <DvForm widthAuto>
              <VerificationForm onSubmit={this.submit} />
            </DvForm>

            {confirmPassword && <Redirect to="/sign_in" />}
          </IntroContainer>
        </S_MainContainer>
        <NotificationContainer />
      </Fragment>
    );
  }

  submit = values => {
    const { UserId, verifyPassword } = this.props;
    localStorage.setItem("userId", UserId);
    verifyPassword(this.user, UserId, values);
  };

  componentWillUnmount() {
    this.props.deleteConfirmationToken(this.user, this.token);
  }
}

export default connect(
  ({ UserId, confirmPassword }) => ({ UserId, confirmPassword }),
  {
    verifyPassword,
    getUserId,
    userType,
    deleteConfirmationToken
  }
)(confirm(Verification));
