import React, { Component } from "react";
import { Header, Modal } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import StyledSubHeaderLink from "../../styleComponents/StyledSubHeaderLink";
import { SaveBtn, CancelBtn } from "../../styleComponents/layout/DvButton";
import { getFormIdByPageName } from "../../helpers/functions";

import { connect } from "react-redux";
import { submit } from "redux-form";

class CompleteLaterModal extends Component {
  state = {
    open: false
  };

  closeModal = ev => {
    ev.preventDefault();
    let close = document.querySelector("i.close.icon");
    close.click();
  };

  submitModal = ev => {
    const { dispatch, user, page } = this.props;
    const formId = getFormIdByPageName(user, page);
    dispatch(submit(formId));
    this.closeModal(ev);
  };

  render() {
    const { submitting } = this.props;

    return (
      <Modal
        size="tiny"
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
            <Header>Do you want to save changes?</Header>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <NavLink to="/dashboard/">
            <CancelBtn primary static="true">
              <span>Don't save</span>
            </CancelBtn>
          </NavLink>
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

export default connect()(CompleteLaterModal);
