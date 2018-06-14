import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, Modal } from "semantic-ui-react";
import { S_PointCard } from "../../styleComponents/layout/S_PointCard";
import {
  editEducationCardWithId,
  editEducationCardWithOutId,
  showConfirmationModal,
  closeConfirmationModal
} from "../../actions/actions";
import EducationForm from "../specialist/forms/EducationForm";
import { isDirty } from "redux-form";

let isEdited = false;

class EditingEducationCard extends Component {
  state = {
    open: false
  };

  render() {
    const { open, size } = this.state;
    const { id, education, handleConfirmationModal } = this.props;
    if (id) {
      this.educationId = Math.random();
      education.educationSuccessId = this.educationId;
    }

    return (
      <div>
        <S_PointCard data-edit onClick={this.show}>
          <i className="fas fa-edit edit-icon" />
        </S_PointCard>
        <Modal
          className="hidden-icon"
          open={open}
          onClose={this.close}
          closeIcon
        >
          <Modal.Header>Editing Your Card</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>/ List your formal education here /</Header>
              <EducationForm
                education={education}
                handleConfirmationModal={handleConfirmationModal}
                onSubmit={this.submit}
              />
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }

  show = () => {
    return this.setState({ open: true });
  };

  submit = education => {
    education.description
      ? education.description
      : (education.description = "");
    let {
      editEducationCardWithId,
      editEducationCardWithOutId,
      id
    } = this.props;
    id
      ? editEducationCardWithId(education, id)
      : editEducationCardWithOutId(
          education,
          this.props.education.educationSuccessId
        );

    this.setState({ open: false });
  };

  close = () => {
    const { showConfirmationModal } = this.props;

    if (isEdited) {
      showConfirmationModal({ formId: "EducationForm" });
    } else {
      closeConfirmationModal();
      this.setState({ open: false });
    }

    setTimeout(() => {
      isEdited = false;
    }, 0);
  };
}

export default connect(
  state => {
    isEdited = isDirty("EducationForm")(state);
    return {};
  },
  {
    editEducationCardWithId,
    editEducationCardWithOutId,
    showConfirmationModal,
    closeConfirmationModal
  }
)(EditingEducationCard);
