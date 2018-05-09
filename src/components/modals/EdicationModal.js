import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, Modal } from "semantic-ui-react";
import { AddNewBtn } from "../../styleComponents/layout/DvButton";
import EducationForm from "../specialist/forms/EducationForm";
import { education } from "../../actions/actions";

class EdicationModal extends Component {
  render() {
    return (
      <Modal
        trigger={
          <a className="addButt" onClick={this.handleClick}>
            <span className="plus">+</span>
            <span className="add">Add education</span>
          </a>
        }
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

  handleClick = ev => {
    ev.preventDefault();
  };

  submit = education => {
    let close = document.querySelector("i.close.icon");
    close.click();
    education.educationSuccessId = Math.random();
    this.props.education(education);
  };
}

export default connect(null, { education })(EdicationModal);
