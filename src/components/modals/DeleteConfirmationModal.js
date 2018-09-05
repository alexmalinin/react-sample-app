import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Header, Modal } from "semantic-ui-react";
import {
  SaveBtn,
  CancelBtn,
  DvBlueButton
} from "../../styleComponents/layout/DvButton";
import { closeConfirmationModal } from "../../actions/actions";

class DeleteConfirmationModal extends Component {
  static propTypes = {
    message: PropTypes.string,
    callback: PropTypes.func.isRequired
  };

  closeModal = ev => {
    const { closeConfirmationModal } = this.props;

    closeConfirmationModal();
  };

  submitModal = ev => {
    const { callback } = this.props;

    callback();
    this.closeModal();
  };

  render() {
    const { submitting, message } = this.props;

    return (
      <Modal
        size="tiny"
        className="hidden-icon"
        open={this.props.isOpen}
        onClose={this.closeModal}
        closeIcon
      >
        <Modal.Content>
          <Modal.Description>
            <Header>{message ? message : "Are you sure?"}</Header>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <DvBlueButton
            type="button"
            className="dv-blue inverted"
            onClick={this.closeModal}
          >
            Cancel
          </DvBlueButton>
          <DvBlueButton
            type="submit"
            className="dv-blue"
            onClick={this.submitModal}
          >
            Yes
          </DvBlueButton>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default connect(null, { closeConfirmationModal })(
  DeleteConfirmationModal
);
