import React, { Component } from "react";
import { Modal } from "semantic-ui-react";

import EditTaskForm from "./EditTaskForm";
import StyledModal from "@styled/Modal";

class EditTaskModal extends Component {
  state = {
    opened: false,
    task: {},
    updated: false
  };

  open = task => this.setState({ opened: true, task });

  close = () => {
    this.setState({ opened: false });
    this.props.close(this.state.updated);
  };

  setUpdated = () => {
    this.setState({ updated: true });
  };

  render() {
    const { epic, currentProjectTeam } = this.props;
    const { opened, task } = this.state;

    return (
      <StyledModal
        open={opened}
        onClose={this.close}
        trigger={<div id="editTask" />}
        size="large"
      >
        <Modal.Header className="ui">Epic - {task.id}</Modal.Header>
        <EditTaskForm
          epic={epic}
          currentProjectTeam={currentProjectTeam}
          initialValues={task}
          epicTask={task}
          onSubmit={this.submit}
          setUpdated={this.setUpdated}
          handleAssign={this.handleAssign}
          close={this.close}
        />
      </StyledModal>
    );
  }

  submit = data => {
    console.log("submit", data);

    // let { updateEpicTask, epic, epicTask } = this.props;
    // updateEpicTask(data, epic, epicTask.id);
  };
}

export default EditTaskModal;
