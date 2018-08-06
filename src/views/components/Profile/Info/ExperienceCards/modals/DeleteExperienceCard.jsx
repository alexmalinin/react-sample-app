import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "semantic-ui-react";

import PointCard from "../PointCard";

import { SaveBtn, CancelBtn } from "@styled/DVButton";
// import {
//   deleteEducationCardWithId,
//   deleteEducationCardWithOutId
// } from "../../actions/actions";

class DeletingEducationCard extends Component {
  state = {
    open: false
  };

  render() {
    const { open, size } = this.state;
    const { id, education } = this.props;

    return (
      <div>
        <PointCard onClick={this.show("tiny")}>
          <i className="fas fa-trash-alt delete-icon" />
        </PointCard>
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
              onClick={this.deleteCard(id, education)}
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

  // deleteCard = (id, education) => () => {
  //   const {
  //     deleteEducationCardWithId,
  //     deleteEducationCardWithOutId
  //   } = this.props;
  //   id
  //     ? deleteEducationCardWithId(id)
  //     : deleteEducationCardWithOutId(education);
  //   this.setState({ open: false });
  // };

  show = (size, id) => () => {
    return this.setState({ size, open: true });
  };

  close = () => this.setState({ open: false });
}

export default connect(null, {
  // deleteEducationCardWithId,
  // deleteEducationCardWithOutId
})(DeletingEducationCard);
