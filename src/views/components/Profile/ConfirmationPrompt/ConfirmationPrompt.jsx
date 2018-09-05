import React from "react";
import PropTypes from "prop-types";
import NavigationPrompt from "react-router-navigation-prompt";
import { withRouter } from "react-router";

import ConfirmationModal from "./ConfirmationModal";

const ConfirmationPrompt = ({ shouldConfirm, formId }) => (
  <NavigationPrompt
    when={(crntLocation, nextLocation) => {
      return shouldConfirm;
    }}
  >
    {({ onConfirm, onCancel }) => (
      <ConfirmationModal
        isOpen={true}
        formId={formId}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    )}
  </NavigationPrompt>
);

ConfirmationPrompt.propTypes = {
  shouldConfirm: PropTypes.bool,
  formId: PropTypes.string
};

ConfirmationPrompt.defaultProps = {
  shouldConfirm: false,
  formId: ""
};

export default withRouter(ConfirmationPrompt);
