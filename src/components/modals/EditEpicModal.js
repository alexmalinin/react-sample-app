import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, Modal } from "semantic-ui-react";
import { AddNewBtn } from "../../styleComponents/layout/DvButton";
import { updateProjectEpic } from "../../actions/actions";
import EditEpicForm from "../client/forms/EditEpicFrom";

class EditEpicModal extends Component {
  render() {
    const { epic, number } = this.props;

    return (
      <Modal trigger={<div>Edit</div>} closeIcon>
        <Modal.Header>Module {number}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>Update module {number} information</Header>
            <EditEpicForm onSubmit={this.submit} epic={epic} />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }

  submit = data => {
    let close = document.querySelector("i.close.icon");
    let {
      epic: { project_id, id },
      updateProjectEpic
    } = this.props;
    data.project_id = project_id;
    data.id = id;
    close.click();
    updateProjectEpic(data);
  };
}

export default EditEpicModal;
