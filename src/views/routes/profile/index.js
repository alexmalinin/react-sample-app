import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { NotificationContainer } from "react-notifications";
import { isDirty, hasSubmitSucceeded } from "redux-form";

import { specialistRoutes, clientRoutes } from "./routes";

import HeaderBasic from "@components/HeaderBasic";
import SubHeader from "@components/Profile/SubHeader";
import SubmitErrorModal from "@components/common/modals/SubmitErrorModal";
import ConfirmSubmitModal from "@components/common/modals/ConfirmSubmitModal";
import ConfirmationPrompt from "@components/Profile/ConfirmationPrompt";
import NotFound from "@components/NotFound";

import EnchancedRoute from "@views/utils/hoc/EnchancedRoute";

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

const ProfileLayout = ({
  userRole,
  isSpecialist,
  modals: { submitError, confirmSubmit },
  form
}) => {
  const routes = isSpecialist ? specialistRoutes : clientRoutes;

  return (
    <div>
      <HeaderBasic />
      <MainContainer>
        <Container>
          <SubHeader percents={percents} routes={routes} userRole={userRole} />
          <Switch>
            {routes.map(route => (
              <EnchancedRoute {...route} key={route.name} title={route.label} />
            ))}
            <Route component={NotFound} />
          </Switch>
        </Container>
      </MainContainer>
      <NotificationContainer />

      <SubmitErrorModal isOpen={submitError} />
      <ConfirmSubmitModal isOpen={!!confirmSubmit} {...confirmSubmit} />
      <ConfirmationPrompt
        shouldConfirm={form.dirty && !form.submitSucceeded}
        formId={form.id}
      />
    </div>
  );
};

ProfileLayout.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired
  }).isRequired,
  userRole: PropTypes.string.isRequired,
  isSpecialist: PropTypes.bool.isRequired,
  form: PropTypes.object.isRequired,
  modals: PropTypes.object
};

const mapStateToProps = (state, props) => {
  let form = {};

  for (let item in state.form) {
    form = {
      id: item,
      dirty: isDirty(item)(state),
      submitSucceeded: hasSubmitSucceeded(item)(state)
    };
  }

  return {
    form,
    userRole: state.user.role,
    isSpecialist: isSpecialist()(state.user),
    modals: state.modals
  };
};

export default connect(mapStateToProps, { getUserData })(ProfileLayout);
