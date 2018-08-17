import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { NotificationContainer } from "react-notifications";

import Info from "./info";
import Industry from "./industry";
import Company from "./company";
import Billings from "./billings";

import HeaderBasic from "@components/HeaderBasic";
import MainContainer from "@styled/MainContainer";
import { Container } from "@styled/Containers";
import SubHeader from "@components/Profile/SubHeader";
import SubmitErrorModal from "@components/common/modals/SubmitErrorModal";

import { getAllUrlParams } from "@views/utils/functions";

import { getUserData } from "@ducks/user/actions";

import "react-notifications/lib/notifications.css";

const percents = {
  profilePercent: null,
  industryPercent: null,
  companyPercent: null,
  billingPercent: null
};

class ProfileLayout extends React.Component {
  componentWillMount() {
    this.props.getUserData();
  }

  render() {
    const {
      match,
      modals: { submitErrorModal }
    } = this.props;

    const isEditing = getAllUrlParams().edit || null;

    return (
      <div>
        <HeaderBasic match={match} />
        <MainContainer>
          <Container>
            <SubHeader percents={percents} />
            <Route
              path={`${match.url}/info`}
              render={props => <Info {...props} isEditing={isEditing} />}
            />

            <Route
              path={`${match.url}/industry`}
              render={props => <Industry {...props} isEditing={isEditing} />}
            />

            <Route
              path={`${match.url}/company`}
              render={props => <Company {...props} isEditing={isEditing} />}
            />

            <Route
              path={`${match.url}/billings`}
              render={props => <Billings {...props} isEditing={isEditing} />}
            />
          </Container>
        </MainContainer>
        <NotificationContainer />
        <SubmitErrorModal isOpen={submitErrorModal} />
      </div>
    );
  }
}

ProfileLayout.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired
  }).isRequired
};

export default connect(({ modals }) => ({ modals }), { getUserData })(
  ProfileLayout
);
