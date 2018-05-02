import React, { Component } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import { S_MainContainer } from "../../styleComponents/layout/S_MainContainer";
import HeaderIntro from "../layout/HeaderIntro";
import StyledFormHeader from "../../styleComponents/StyledFormHeader";
import DvForm from "../../styleComponents/Tabs";
import confirm from "../../decorators/confirm";
import VerificationForm from "../Verification/VerificationForm";
import { IntroContainer } from "../../styleComponents/layout/Container";
import { getPasswordsForResetPassword, userType } from "../../actions/actions";

class ResetPage extends Component {
  componentWillMount() {
    let { match } = this.props;
    this.token = match.params.token;
    this.user = match.params.user;
  }

  render() {
    const { confirm, confirmAccount, signInReducer } = this.props;
    return (
      <main>
        <HeaderIntro />
        <S_MainContainer>
          <IntroContainer>
            <StyledFormHeader borderBottom>
              <div className="form-title">Reset Password</div>
            </StyledFormHeader>

            <DvForm widthAuto>
              <VerificationForm onSubmit={this.submit} />
            </DvForm>
            {signInReducer && this.getUserRedirect()}
          </IntroContainer>
        </S_MainContainer>
      </main>
    );
  }

  componentDidMount() {
    let tab = this.user === "customer" ? "Client" : "Specialist";
    this.props.userType(tab);
  }

  getUserRedirect = () => {
    return (
      <div>
        <Redirect to="/sign_in" />
      </div>
    );
  };

  submit = passwords => {
    this.props.getPasswordsForResetPassword(passwords, this.user, this.token);
  };

  componentWillUnmount() {
    // this.props.deleteConfirmationToken(this.user, this.token); // need to do later
  }
}

export default connect(({ signInReducer }) => ({ signInReducer }), {
  userType,
  getPasswordsForResetPassword
})(confirm(ResetPage));
