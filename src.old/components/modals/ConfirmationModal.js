import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { submit } from "redux-form";
import { Header, Modal } from "semantic-ui-react";
import { SaveBtn, CancelBtn } from "../../styleComponents/layout/DvButton";

class ConfirmationModal extends Component {
  confirmModal = () => {
    const { onConfirm } = this.props;

    if (onConfirm) {
      onConfirm();
    }
  };

  closeModal = ev => {
    const { onCancel, clearLocation } = this.props;

    ev.preventDefault();
    let close = document.querySelector("i.close.icon");
    close.click();

    clearLocation && clearLocation();

    if (onCancel) {
      onCancel();
    }
  };

  submitModal = ev => {
    const { dispatch, formId, onCancel } = this.props;

    dispatch(submit(formId));

    if (onCancel) {
      onCancel();
    }
  };

  render() {
    const { submitting, isInvalid } = this.props;

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
            <Header>
              {isInvalid
                ? "Please fill in all the required fields"
                : "Do you want to save changes?"}
            </Header>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          {isInvalid ? (
            <CancelBtn primary static="true" onClick={this.closeModal}>
              <span>Cancel</span>
            </CancelBtn>
          ) : (
            <Fragment>
              <CancelBtn
                primary
                positionleft="10"
                positionbottom="auto"
                onClick={this.confirmModal}
              >
                <span>Don't save</span>
              </CancelBtn>
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
                <span>Save</span>
              </SaveBtn>
            </Fragment>
          )}
        </Modal.Actions>
      </Modal>
    );
  }
}

export default connect()(ConfirmationModal);
