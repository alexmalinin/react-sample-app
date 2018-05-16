import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "semantic-ui-react";
import EditTaskForm from "../client/forms/EditTaskForm";
import { updateEpicTask } from "../../actions/actions";

class EditTaskModal extends Component {
  render() {
    const { content, epic, project, epicTask } = this.props;

    return (
      <Modal trigger={<div id="editTask" />} closeIcon>
        <Modal.Header>Edit epic</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <EditTaskForm
              epic={epic}
              epicTask={epicTask}
              onSubmit={this.submit}
            />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }

  submit = data => {
    let close = document.querySelector("i.close.icon");
    let { updateEpicTask, epic, epicTask } = this.props;
    close.click();
    updateEpicTask(data, epic, epicTask.id);
  };
}

export default connect(null, { updateEpicTask })(EditTaskModal);
