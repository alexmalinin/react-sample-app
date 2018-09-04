import React, { Component } from "react";
import { Modal } from "semantic-ui-react";

import EditTask from "./EditTask";
import StyledModal from "@styled/Modal";

class EditTaskModal extends Component {
  state = {
    opened: false,
    taskId: null,
    updated: false
  };

  open = id => this.setState({ opened: true, taskId: id });

  close = () => {
    this.setState({ opened: false });
    this.props.close(this.state.updated);
  };

  setUpdated = () => {
    this.setState({ updated: true });
  };

  submit = data => {
    console.log("submit", data);

    // let { updateEpicTask, epic, epicTask } = this.props;
    // updateEpicTask(data, epic, epicTask.id);
  };

  render() {
    const { epic, currentProjectTeam } = this.props;
    const { opened, taskId } = this.state;

    return (
      <StyledModal
        open={opened}
        onClose={this.close}
        trigger={<div id="editTask" />}
        size="large"
      >
        <Modal.Header className="ui">Epic - {taskId}</Modal.Header>
        <EditTask
          epic={epic}
          // currentProjectTeam={currentProjectTeam}
          taskId={taskId}
          // onSubmit={this.submit}
          setUpdated={this.setUpdated}
          handleAssign={this.handleAssign}
          close={this.close}
        />
      </StyledModal>
    );
  }
}

export default EditTaskModal;
