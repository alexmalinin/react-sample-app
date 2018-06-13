import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "semantic-ui-react";

import NewTaskForm from "../client/forms/NewTaskForm";
import { createEpicTask } from "../../actions/actions";
import StyledSubHeaderLink from "../../styleComponents/StyledSubHeaderLink";

class AddTaskModal extends Component {
  render() {
    const { content, epic, project } = this.props;

    return (
      <Modal
        trigger={
          <a className="button">
            <StyledSubHeaderLink className="rightLink addButton modalTrigger" />
            <span>{content}</span>
          </a>
        }
      >
        <Modal.Header>Epic creation</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <NewTaskForm project={project} epic={epic} onSubmit={this.submit} />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }

  submit = data => {
    console.log("add_submit_data", data);
    let close = document.querySelector("i.close.icon");
    let { createEpicTask } = this.props;
    close.click();
    createEpicTask(data, data.epic.value);
  };
}

export default connect(null, { createEpicTask })(AddTaskModal);
