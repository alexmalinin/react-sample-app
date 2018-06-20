import React, { Component } from "react";
import { Modal } from "semantic-ui-react";
import EditEpicForm from "../client/forms/EditEpicFrom";
import StyledModal from "../../styleComponents/layout/StyledModal";

class EditEpicModal extends Component {
  state = {
    opened: false,
    edited: false
  };

  open = () => {
    this.setState({ opened: true });
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
    const { opened } = this.state;

    return (
      <StyledModal
        open={opened}
        onClose={this.close}
        // trigger={
        //   <div onClick={this.open} id={`editEpic${epic.id}`}>
        //     Edit
        //   </div>
        // }
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
}

export default EditEpicModal;
