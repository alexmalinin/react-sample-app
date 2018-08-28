import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { NotificationContainer } from "react-notifications";

import HeaderIntro from "@components/HeaderIntro";
import CreatePassword from "@components/CreatePassword";

import MainContainer from "@styled/MainContainer";
import { IntroContainer } from "@styled/Containers";

const CreatePasswordLayout = ({ match }) => {
  document.title = "Create Password | Digital Village";

  return (
    <Fragment>
      <HeaderIntro />
      <MainContainer>
        <IntroContainer>
          <Route path={`${match.url}`} component={CreatePassword} />
        </IntroContainer>
      </MainContainer>

      <NotificationContainer />
    </Fragment>
  );
};

CreatePasswordLayout.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired
  }).isRequired
};

export default CreatePasswordLayout;
