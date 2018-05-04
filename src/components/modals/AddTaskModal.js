import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, Modal } from "semantic-ui-react";

import NewTaskForm from "../client/forms/NewTaskForm";

import StyledSubHeaderLink from "../../styleComponents/StyledSubHeaderLink";

class AddTaskModal extends Component {
  render() {
    const { content } = this.props;

    return (
      <Modal
        trigger={
          <a className="button">
            <StyledSubHeaderLink className="rightLink addButt" />
            {content}
          </a>
        }
        closeIcon
      >
        <Modal.Header>Task creation</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>New Task</Header>
            <NewTaskForm onSubmit={this.submit} />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }

  submit = data => {
    let close = document.querySelector("i.close.icon");
    let { currentEpicId, createEpicTask } = this.props;
    close.click();
    createEpicTask(data, currentEpicId);
  };
}

export default AddTaskModal;
