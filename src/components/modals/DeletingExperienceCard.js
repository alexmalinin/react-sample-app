import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal } from "semantic-ui-react";
import { S_PointCard } from "../../styleComponents/layout/S_PointCard";
import { SaveBtn, CancelBtn } from "../../styleComponents/layout/DvButton";
import {
  deleteExperienceCardWithId,
  deleteExperienceCardWithOutId
} from "../../actions/actions";

class DeletingExperienceCard extends Component {
  state = {
    open: false
  };

  render() {
    const { open, size } = this.state;
    const { id, experience } = this.props;

    return (
      <div>
        <S_PointCard onClick={this.show("tiny")}>
          <i className="fas fa-trash-alt delete-icon" />
        </S_PointCard>
        <Modal size={size} open={open} onClose={this.close}>
          <Modal.Header>Deleting Your Card</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete this card?</p>
          </Modal.Content>
          <Modal.Actions>
            <CancelBtn onClick={this.cancelDelete} primary static="true">
              <span>No</span>
            </CancelBtn>
            <SaveBtn
              onClick={this.deleteCard(id, experience)}
              primary
              updatebtn="true"
              static="true"
            >
              <span>Yes</span>
            </SaveBtn>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }

  cancelDelete = () => {
    this.setState({ open: false });
  };

  deleteCard = (id, experience) => () => {
    const {
      deleteExperienceCardWithId,
      deleteExperienceCardWithOutId
    } = this.props;
    id
      ? deleteExperienceCardWithId(id)
      : deleteExperienceCardWithOutId(experience);
    this.setState({ open: false });
  };

  show = (size, id) => () => {
    return this.setState({ size, open: true });
  };

  close = () => this.setState({ open: false });
}

export default connect(null, {
  deleteExperienceCardWithId,
  deleteExperienceCardWithOutId
})(DeletingExperienceCard);
