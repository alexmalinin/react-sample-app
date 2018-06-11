import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, Modal } from "semantic-ui-react";
import { CancelBtn } from "../../styleComponents/layout/DvButton";
import { closeSubmitErrorModal } from "../../actions/actions";

class SubmitFormErrorModal extends Component {
  state = {
    open: false
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ open: nextProps.isOpen });
  }

  closeModal = ev => {
    const { close, closeSubmitErrorModal } = this.props;
    this.setState({ open: false });

    if (closeSubmitErrorModal) {
      closeSubmitErrorModal();
    }

    if (close) {
      this.props.close();
    }
  };

  render() {
    const { open } = this.state;

    return (
      <Modal
        size="tiny"
        open={this.props.isOpen}
        onClose={this.closeModal}
        closeIcon
      >
        <Modal.Content>
          <Modal.Description>
            <Header>Please fill in all the required fields</Header>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <CancelBtn onClick={this.closeModal} primary static="true">
            <span>Close</span>
          </CancelBtn>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default connect(null, { closeSubmitErrorModal })(SubmitFormErrorModal);
