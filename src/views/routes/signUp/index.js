import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

import HeaderIntro from "@components/HeaderIntro";
import signUp from "@components/SignUp";

import MainContainer from "@styled/MainContainer";
import { IntroContainer } from "@styled/Containers";

const SignUpLayout = ({ match }) => (
  <Fragment>
    <HeaderIntro />
    <MainContainer>
      <IntroContainer>
        <Route path={`${match.url}`} component={signUp} />
      </IntroContainer>
    </MainContainer>
  </Fragment>
);

SignUpLayout.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired
  }).isRequired
};

export default SignUpLayout;
