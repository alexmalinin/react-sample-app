import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Header, Modal } from "semantic-ui-react";
import { S_PointCard } from "../../styleComponents/layout/S_PointCard";
import {
  editExperienceCardWithId,
  editExperienceCardWithOutId
} from "../../actions/actions";
import WorkExperienceForm from "../specialist/forms/WorkExperienceForm";

class EditingExperienceCard extends Component {
  state = {
    open: false
  };

  render() {
    const { open, size } = this.state;
    const { id, experience } = this.props;
    if (id) {
      this.experienceId = Math.random();
      experience.experienceSuccessId = this.experienceId;
    } else {
      console.log(experience.experienceSuccessId);
    }

    return (
      <div>
        <S_PointCard
          color="red"
          data-edit
          className="edit icon"
          onClick={this.show}
        />
        <Modal open={open} onClose={this.close} closeIcon>
          <Modal.Header>Editing Your Card</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>/ List your formal experience here /</Header>
              <WorkExperienceForm
                experience={experience}
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

  submit = experience => {
    experience.description
      ? experience.description
      : (experience.description = "");
    let {
      editExperienceCardWithId,
      editExperienceCardWithOutId,
      id
    } = this.props;
    id
      ? editExperienceCardWithId(experience, id)
      : editExperienceCardWithOutId(
          experience,
          this.props.experience.experienceSuccessId
        );
    this.close();
  };

  close = () => this.setState({ open: false });
}

export default connect(null, {
  editExperienceCardWithId,
  editExperienceCardWithOutId
})(EditingExperienceCard);
