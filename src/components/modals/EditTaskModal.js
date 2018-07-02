import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "semantic-ui-react";
import EditTaskForm from "../client/forms/EditTaskForm";
import { updateEpicTask } from "../../actions/actions";
import StyledModal from "../../styleComponents/layout/StyledModal";

class EditTaskModal extends Component {
  state = {
    opened: false,
    updated: false
  };

  open = () => this.setState({ opened: true });

  close = () => this.props.close(this.state.updated);

  setUpdated = () => {
    this.setState({ updated: true });
  };

  render() {
    const { epic, epicTask, open, close } = this.props;

    return (
      <StyledModal
        open={open}
        onClose={this.close}
        trigger={<div id="editTask" />}
        closeIcon={<button className="close icon" onClick={close} />}
      >
        <Modal.Content>
          <Modal.Description>
            <EditTaskForm
              epic={epic}
              initialValues={epicTask}
              epicTask={epicTask}
              onSubmit={this.submit}
              setUpdated={this.setUpdated}
              handleAssign={this.handleAssign}
            />
          </Modal.Description>
        </Modal.Content>
      </StyledModal>
    );
  }

  submit = data => {
    console.log("submit", data);

    // let { updateEpicTask, epic, epicTask } = this.props;
    // updateEpicTask(data, epic, epicTask.id);
  };
}

export default connect(null, { updateEpicTask })(EditTaskModal);
