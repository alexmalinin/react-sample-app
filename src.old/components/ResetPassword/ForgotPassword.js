import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import HeaderIntro from "../layout/HeaderIntro";
import { S_MainContainer } from "../../styleComponents/layout/S_MainContainer";
import StyledFormHeader from "../../styleComponents/StyledFormHeader";
import { DvTitleMedium } from "../../styleComponents/layout/DvTitles";
import ForgotPasswordForm from "./ForgotPasswordForm";
import {
  Container,
  IntroContainer
} from "../../styleComponents/layout/Container";
import { getTokenForResetPassword } from "../../actions/actions";
import { Message } from "semantic-ui-react";

class ForgotPassword extends Component {
  render() {
    const { signInReducer } = this.props;

    return (
      <Fragment>
        <HeaderIntro />
        <S_MainContainer>
          <IntroContainer>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <StyledFormHeader borderBottom>
                    <div className="form-title">Forgot Password?</div>
                    <div className="form-subtitle">
                      Get a varification code sent to your email adress
                    </div>
                  </StyledFormHeader>

                  {signInReducer &&
                    signInReducer.failResetPassword && (
                      <Message
                        floating
                        negative
                        style={{ marginBottom: "25px" }}
                      >
                        {signInReducer && signInReducer.data}
                      </Message>
                    )}

                  <ForgotPasswordForm onSubmit={this.submit} />

                  {signInReducer &&
                    signInReducer.resetPassword && (
                      <Redirect to="/reset_password" />
                    )}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </IntroContainer>
        </S_MainContainer>
      </Fragment>
    );
  }

  submit = email => {
    let user = sessionStorage.getItem("user");
    localStorage.setItem("user_email", email["email"]);
    this.props.getTokenForResetPassword(email, user);
  };
}

export default connect(({ signInReducer }) => ({ signInReducer }), {
  getTokenForResetPassword
})(ForgotPassword);
