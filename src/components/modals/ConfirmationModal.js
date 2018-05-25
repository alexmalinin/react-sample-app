import React, { Component } from "react";
import { Header, Modal } from "semantic-ui-react";
import StyledSubHeaderLink from "../../styleComponents/StyledSubHeaderLink";
import { SaveBtn, CancelBtn } from "../../styleComponents/layout/DvButton";
import { getFormIdByPageName } from "../../helpers/functions";

import { connect } from "react-redux";
import { submit } from "redux-form";

class ConfirmationModal extends Component {
  state = {
    open: false
  };

  componentWillMount() {
    console.log(this.props);
    const { onConfirm } = this.props;
    if (this.props.isSubmitted) {
      onConfirm();
    }
  }

  closeModal = ev => {
    const { onCancel } = this.props;

    ev.preventDefault();
    let close = document.querySelector("i.close.icon");
    close.click();

    if (onCancel) {
      onCancel();
    }
  };

  submitModal = ev => {
    const { dispatch, user, page, isSubmitted, onConfirm } = this.props;

    const formId = getFormIdByPageName(user, page);
    this.closeModal(ev);
    if (isSubmitted) {
      dispatch(submit(formId));
    }

    if (onConfirm) {
      onConfirm();
    }
  };

  render() {
    const { isSubmitted, submitting } = this.props;

    return (
      <Modal
        size="tiny"
        open={!isSubmitted}
        onClose={this.closeModal}
        trigger={
          <a className="button">
            <StyledSubHeaderLink className="rightLink arrow" />Complete Later
          </a>
        }
        closeIcon
      >
        <Modal.Content>
          <Modal.Description>
            <Header>Are you sure you want to leave?</Header>
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
            <span>Ok</span>
          </SaveBtn>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default connect()(ConfirmationModal);
