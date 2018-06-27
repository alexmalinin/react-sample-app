import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Header, Modal } from "semantic-ui-react";
import { SaveBtn, CancelBtn } from "../../styleComponents/layout/DvButton";
import { closeConfirmationModal } from "../../actions/actions";

class DeleteConfirmationModal extends Component {
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
          <CancelBtn primary static="true" onClick={this.closeModal}>
            <span>Cancel</span>
          </CancelBtn>
          <SaveBtn
            type="submit"
            disabled={submitting}
            onClick={this.submitModal}
            primary
            updatebtn="true"
            static="true"
          >
            <span>Yes</span>
          </SaveBtn>
        </Modal.Actions>
      </Modal>
    );
  }
}

DeleteConfirmationModal.propTypes = {
  message: PropTypes.string,
  callback: PropTypes.func.isRequired
};

export default connect(null, { closeConfirmationModal })(
  DeleteConfirmationModal
);
