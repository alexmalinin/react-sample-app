import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Modal } from "semantic-ui-react";
import NewTaskForm from "../client/forms/NewTaskForm";
import { createEpicTask } from "../../actions/actions";
import StyledSubHeaderLink from "../../styleComponents/StyledSubHeaderLink";
import StyledModal from "../../styleComponents/layout/StyledModal";

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

  render() {
    const { content, epic, project } = this.props;

    return (
      <StyledModal
        trigger={
          <a className="button" onClick={() => this.setState({ open: true })}>
            <StyledSubHeaderLink className="rightLink addButton modalTrigger" />
            <span>{content}</span>
          </a>
        }
        className="addTask hidden-icon"
        closeIcon
      >
        <Modal.Header>Epic creation</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <NewTaskForm
              project={project}
              epic={epic}
              onSubmit={this.submit}
              handleChangeState={this.handleChangeState}
            />
          </Modal.Description>
        </Modal.Content>
      </StyledModal>
    );
  }

  submit = data => {
    // console.log("add_submit_data", data);
    let close = document.querySelector("i.close.icon");
    let { createEpicTask } = this.props;
    close.click();
    this.setState({ open: false });
    createEpicTask(data, data.epic.value);
  };
}

export default connect(null, { createEpicTask })(AddTaskModal);
