import React, { Component } from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import NavigationPrompt from "react-router-navigation-prompt";

import ConfirmationModal from "./ConfirmationModal";

class ConfirmationPrompt extends Component {
  static propTypes = {
    shouldConfirm: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
    formId: PropTypes.string.isRequired
  };

  render() {
    console.log("Prompt", this.props);

    return (
      <NavigationPrompt
        when={(crntLocation, nextLocation) => {
          console.log("inside", this.props);
          // this.setState({
          //   nextLocation: nextLocation.pathname + nextLocation.search
          // });
          this.props.handleChange(nextLocation.pathname + nextLocation.search);
          return this.props.shouldConfirm;
        }}
      >
        {({ onConfirm, onCancel }) => (
          <ConfirmationModal
            isOpen={true}
            formId={this.props.formId}
            // clearLocation={this.clearLocation}
            onCancel={onCancel}
            onConfirm={onConfirm}
          />
        )}
      </NavigationPrompt>
    );
  }
}

export default withRouter(ConfirmationPrompt);
