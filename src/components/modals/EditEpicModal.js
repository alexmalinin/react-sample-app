import React, { Component, Fragment } from "react";
import { Modal, Message } from "semantic-ui-react";
import EditEpicForm from "../client/forms/EditEpicFrom";
import axios from "axios";
import { PORT, CUSTOMER, S_REDGUY } from "../../constans/constans";
import { S_Message } from "../../styleComponents/layout/S_Message";
import StyledModal from "../../styleComponents/layout/StyledModal";
import { oneOfRoles } from "../../helpers/functions";

class EditEpicModal extends Component {
  state = {
    renderMessage: false,
    renderErrorMessage: false,
    opened: false,
    edited: false
  };

  open = () => {
    if (oneOfRoles(CUSTOMER, S_REDGUY)) {
      this.setState({ opened: true });
    }
  };

  close = () => {
    const {
      showAllEpics,
      epic: { project_id }
    } = this.props;
    const { edited } = this.state;
    if (edited) {
      showAllEpics(project_id);
    }
    this.setState({ opened: false });
  };

  setEdited = () => {
    this.setState({ edited: true });
  };

  render() {
    const { epic, number } = this.props;
    const { renderMessage, renderErrorMessage, opened } = this.state;

    return (
      <StyledModal
        open={opened}
        onClose={this.close}
        trigger={
          <div onClick={this.open} id={`editEpic${epic.id}`}>
            Edit
          </div>
        }
      >
        <button className="close icon" onClick={this.close} />
        <Modal.Content>
          <Modal.Description>
            <EditEpicForm
              onSubmit={this.submit}
              initialValues={epic}
              epic={epic}
              number={number}
              setEdited={this.setEdited}
            />
          </Modal.Description>
        </Modal.Content>
      </StyledModal>
    );
  }

  submit = data => {
    let {
      epic: { project_id, id },
      showAllEpics,
      renderMessage,
      renderErrorMessage
    } = this.props;

    axios({
      method: "PUT",
      url: `${PORT}/api/v1/projects/${project_id}/epics/${id}`,
      data: {
        epic: {
          name: data["name"],
          user_story: data["user_story"],
          business_requirements: data["business_requirements"],
          business_rules: data["business_rules"],
          deliverables: data["deliverables"],
          description: data["description"],
          notes: data["notes"],
          eta: data["eta"]
          // attached_files_attributes: files
        }
      }

      // ,headers: {
      //   Authorization: `Bearer ${token}`
      // }
    })
      .then(response => {
        showAllEpics(project_id);
        renderMessage();
        // toggle();
      })
      .catch(error => {
        console.log(error);
        renderErrorMessage();
        // toggle();
        // this.setState({ renderErrorMessage: true });
      });
  };
}

export default EditEpicModal;
