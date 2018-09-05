import React, { Component } from "react";
import { Header, Modal } from "semantic-ui-react";

import EducationForm from "../forms/EducationForm";

class AddEducation extends Component {
  handleClick = ev => {
    ev.preventDefault();
  };

  submit = education => {
    let close = document.querySelector("i.close.icon");
    close.click();
    education.successId = Date.now();

    this.props.addEducationCard(education);
  };

  render() {
    return (
      <Modal
        trigger={
          <a className="addButton" onClick={this.handleClick}>
            <span className="plus">+</span>
            <span className="add">Add education</span>
          </a>
        }
        className="hidden-icon"
        closeIcon
      >
        <Modal.Header>Education</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>List any formal education here</Header>
            <EducationForm onSubmit={this.submit} />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default AddEducation;
