import React, { Component } from "react";
import { Header, Modal } from "semantic-ui-react";
import { CancelBtn } from "../../styleComponents/layout/DvButton";

class SubmitFormErrorModal extends Component {
  state = {
    open: false
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ open: nextProps.isOpen });
  }

  closeModal = ev => {
    this.setState({ open: false });
    this.props.close();
  };

  render() {
    const { open } = this.state;

    return (
      <Modal size="tiny" open={open} onClose={this.closeModal} closeIcon>
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

export default SubmitFormErrorModal;
