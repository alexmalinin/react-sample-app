import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, Modal } from "semantic-ui-react";
import { AddNewBtn } from "../../styleComponents/layout/DvButton";
import WorkExperienceForm from "../specialist/forms/WorkExperienceForm";
import { workExperience } from "../../actions/actions";

class WorkExperienceModal extends Component {
  render() {
    return (
      <Modal
        trigger={
          <a className="addButt" onClick={this.handleClick}>
            <span className="plus">+</span>
            <span className="add">Add work experience</span>
          </a>
        }
        closeIcon
      >
        <Modal.Header>Work Experience</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>
              Tell us about previous companies you’ve worked at, projects you’ve
              worked on or things you’ve built
            </Header>
            <WorkExperienceForm onSubmit={this.submit} />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }

  handleClick = ev => {
    ev.preventDefault();
  };

  submit = experience => {
    let close = document.querySelector("i.close.icon");
    close.click();
    experience.experienceSuccessId = Math.random();
    console.log(experience);
    this.props.workExperience(experience);
  };
}

export default connect(null, { workExperience })(WorkExperienceModal);
