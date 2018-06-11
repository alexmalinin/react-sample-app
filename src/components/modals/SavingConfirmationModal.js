import React, { Component } from "react";
import { connect } from "react-redux";
import { submit } from "redux-form";
import { Header, Modal } from "semantic-ui-react";
import { SaveBtn, CancelBtn } from "../../styleComponents/layout/DvButton";
import { closeConfirmationModal } from "../../actions/actions";
import { CLOSE_CONFIRMATION_MODAL } from "../../constans/constans";

class SavingConfirmationModal extends Component {
  confirmModal = ev => {
    const { dispatch, formId } = this.props;

    dispatch({ type: CLOSE_CONFIRMATION_MODAL });

    ev.preventDefault();
    let close = document.querySelector("i.close.icon");
    close.click();
  };

  closeModal = ev => {
    const { handleChangeState, closeConfirmationModal, dispatch } = this.props;

    if (handleChangeState) {
      this.props.handleChangeState("confirmation", false);
    }

    dispatch({ type: CLOSE_CONFIRMATION_MODAL });
  };

  submitModal = ev => {
    const { dispatch, formId } = this.props;

    dispatch(submit(formId));
  };

  render() {
    const { submitting } = this.props;

    return (
      <Modal
        size="tiny"
        open={this.props.isOpen}
        onClose={this.closeModal}
        closeIcon
      >
        <Modal.Content>
          <Modal.Description>
            <Header>Do you want to save changes?</Header>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
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
        </Modal.Actions>
      </Modal>
    );
  }
}

export default connect()(SavingConfirmationModal);
