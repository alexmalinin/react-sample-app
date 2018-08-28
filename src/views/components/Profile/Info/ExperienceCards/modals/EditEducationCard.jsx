import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, Modal } from "semantic-ui-react";
import { isDirty } from "redux-form";

import PointCard from "../PointCard";

import EducationForm from "../forms/EducationForm";

import {
  showConfirmSubmitModal,
  closeConfirmSubmitModal
} from "@ducks/modals/actions";

let isEdited = false;

class EditExperienceCard extends Component {
  state = {
    open: false
  };

  show = () => this.setState({ open: true });

  close = () => {
    if (isEdited) {
      this.props.showConfirmSubmitModal({ formId: "EducationForm" });
    } else {
      this.setState({ open: false });
    }

    setTimeout(() => {
      isEdited = false;
    }, 0);
  };

  submit = experience => {
    this.props.editCard(experience);

    this.props.closeConfirmSubmitModal();
    this.setState({ open: false });
  };

  render() {
    const { open, size } = this.state;
    const { education, handleConfirmationModal } = this.props;

    return (
      <div>
        <PointCard data-edit onClick={this.show}>
          <i className="fas fa-edit edit-icon" />
        </PointCard>
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
                onSubmit={this.submit}
                education={education}
                handleConfirmationModal={handleConfirmationModal}
              />
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  isEdited = isDirty("EducationForm")(state);
  return {};
};

const mapDispatchToProps = {
  showConfirmSubmitModal,
  closeConfirmSubmitModal
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExperienceCard);
