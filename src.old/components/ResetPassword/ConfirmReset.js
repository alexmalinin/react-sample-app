import React, { Component, Fragment } from "react";
import HeaderIntro from "../layout/HeaderIntro";
import { S_MainContainer } from "../../styleComponents/layout/S_MainContainer";
import StyledFormHeader from "../../styleComponents/StyledFormHeader";
import { DvTitle } from "../../styleComponents/layout/DvTitles";
import {
  Container,
  IntroContainer
} from "../../styleComponents/layout/Container";

class ResetPassword extends Component {
  render() {
    const { signUpData } = this.props;

    return (
      <Fragment>
        <HeaderIntro />
        <S_MainContainer>
          <IntroContainer>
            <StyledFormHeader borderBottom>
              <div className="form-title">Reset Password</div>
            </StyledFormHeader>

            <div className="confirm-msg">
              <p>Please reset your password by link on your email</p>
              <div>{localStorage.getItem("user_email")}</div>
            </div>
          </IntroContainer>
        </S_MainContainer>
      </Fragment>
    );
  }
}

export default ResetPassword;
