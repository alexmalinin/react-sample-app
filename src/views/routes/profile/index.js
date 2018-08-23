import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { NotificationContainer } from "react-notifications";

import { specialistRoutes, clientRoutes } from "./routes";

import HeaderBasic from "@components/HeaderBasic";
import SubHeader from "@components/Profile/SubHeader";
import SubmitErrorModal from "@components/common/modals/SubmitErrorModal";

import MainContainer from "@styled/MainContainer";
import { Container } from "@styled/Containers";

import { getUserData } from "@ducks/user/actions";
import { isSpecialist } from "@ducks/user/selectors";

import "react-notifications/lib/notifications.css";

const percents = {
  profile: null,
  industry: null,
  company: null,
  billing: null
};

const ProfileLayout = ({ modals: { submitErrorModal }, isSpecialist }) => {
  const routes = isSpecialist ? specialistRoutes : clientRoutes;

  return (
    <div>
      <HeaderBasic />
      <MainContainer>
        <Container>
          <SubHeader percents={percents} routes={routes} />
          {routes.map(route => <Route {...route} key={route.name} />)}
        </Container>
      </MainContainer>
      <NotificationContainer />
      <SubmitErrorModal isOpen={submitErrorModal} />
    </div>
  );
};

ProfileLayout.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired
  }).isRequired
};

const mapStateToProps = (state, props) => {
  return {
    isSpecialist: isSpecialist(state),
    modals: state.modals
  };
};

export default connect(mapStateToProps, { getUserData })(ProfileLayout);
