import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { NotificationContainer } from "react-notifications";

import HeaderIntro from "@components/HeaderIntro";
import ResetPassword from "@components/ResetPassword";

import MainContainer from "@styled/MainContainer";
import { IntroContainer } from "@styled/Containers";

const ResetPasswordLayout = ({ match }) => {
  document.title = "Reset Password | Digital Village";

  return (
    <Fragment>
      <HeaderIntro />
      <MainContainer>
        <IntroContainer>
          <Route path={`${match.url}`} component={ResetPassword} />
        </IntroContainer>
      </MainContainer>

      <NotificationContainer />
    </Fragment>
  );
};

ResetPasswordLayout.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired
  }).isRequired
};

export default ResetPasswordLayout;
