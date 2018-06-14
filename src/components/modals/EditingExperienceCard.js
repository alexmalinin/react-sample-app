import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button, Header, Modal } from "semantic-ui-react";
import { S_PointCard } from "../../styleComponents/layout/S_PointCard";
import {
  editExperienceCardWithId,
  editExperienceCardWithOutId,
  showConfirmationModal,
  closeConfirmationModal
} from "../../actions/actions";
import WorkExperienceForm from "../specialist/forms/WorkExperienceForm";
import { isDirty } from "redux-form";

let isEdited = false;

class EditingExperienceCard extends Component {
  state = {
    open: false
  };

  render() {
    const { open, size } = this.state;
    const { id, experience, handleChangeState } = this.props;
    if (id) {
      this.experienceId = Math.random();
      experience.experienceSuccessId = this.experienceId;
    } else {
      console.log(experience.experienceSuccessId);
    }

    return (
      <Fragment>
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
              <Header>/ List your formal experience here /</Header>
              <WorkExperienceForm
                experience={experience}
                handleChangeState={handleChangeState}
                handleEditForm={this.handleEditForm}
                onSubmit={this.submit}
              />
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </Fragment>
    );
  }

  show = () => {
    return this.setState({ open: true, fetchConfirmation: true });
  };

  submit = experience => {
    experience.description
      ? experience.description
      : (experience.description = "");
    let {
      editExperienceCardWithId,
      editExperienceCardWithOutId,
      id,
      closeConfirmationModal
    } = this.props;
    id
      ? editExperienceCardWithId(experience, id)
      : editExperienceCardWithOutId(
          experience,
          this.props.experience.experienceSuccessId
        );

    // this.close();
    closeConfirmationModal();
    this.setState({ open: false });
  };

  close = () => {
    const { showConfirmationModal } = this.props;

    if (isEdited) {
      showConfirmationModal({ formId: "WorkExperienceForm" });
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
    isEdited = isDirty("WorkExperienceForm")(state);
    return {};
  },
  {
    editExperienceCardWithId,
    editExperienceCardWithOutId,
    showConfirmationModal,
    closeConfirmationModal
  }
)(EditingExperienceCard);
