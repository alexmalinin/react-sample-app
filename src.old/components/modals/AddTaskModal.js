import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "semantic-ui-react";

import NewTaskForm from "../client/forms/NewTaskForm";
import StyledModal from "../../styleComponents/layout/StyledModal";

import { createEpicTask } from "../../actions/actions";

class AddTaskModal extends Component {
  state = {
    open: false,
    isEdited: false,
    loading: false
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

  callback = success => {
    this.setState({ loading: false });
    if (success) {
      this.close();
    }
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
          loading={this.state.loading}
        />
      </StyledModal>
    );
  }

  submit = data => {
    this.setState({ loading: true });
    this.props.createEpicTask(data, data.epic.value, this.callback);
  };
}

export default connect(({ createTask }) => ({ createTask }), {
  createEpicTask
})(AddTaskModal);
