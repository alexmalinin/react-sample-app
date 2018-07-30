import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "semantic-ui-react";

import NewTaskForm from "view/components/forms/client/NewTaskForm";
import StyledModal from "../../styleComponents/layout/StyledModal";

import { epicsOperations } from "state/ducks/epics";

class AddTaskModal extends Component {
  state = {
    open: false,
    isEdited: false
  };

  handleChangeState = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  closeErrorModal = () => {
    this.setState({ submitError: false });
  };

  close = () => {
    const close = document.querySelector("i.close.icon");
    close.click();
  };

  render() {
    const { epic, project, trigger } = this.props;

    return (
      <StyledModal
        trigger={trigger}
        className="addTask hidden-icon"
        size="large"
        closeIcon
      >
        <Modal.Header className="ui">Create epic</Modal.Header>
        <NewTaskForm
          project={project}
          epic={epic}
          onSubmit={this.submit}
          handleChangeState={this.handleChangeState}
          close={this.close}
        />
      </StyledModal>
    );
  }

  submit = data => {
    this.props.createEpicTask(data, data.epic.value, this.close);
  };
}

export default connect(({ createTask }) => ({ createTask }), {
  createEpicTask: epicsOperations.createEpicTask
})(AddTaskModal);
