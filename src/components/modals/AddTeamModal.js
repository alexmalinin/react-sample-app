import React, { Component } from "react";
import { Header, Modal } from "semantic-ui-react";
import StyledSubHeaderLink from "../../styleComponents/StyledSubHeaderLink";
import AddTeamForm from "../forms/AddTeamForm";

class AddTeamModal extends Component {
  componentWillMount() {
    // console.log('modal loaded')
  }

  render() {
    return (
      <Modal
        size="tiny"
        trigger={
          <a className="button">
            <StyledSubHeaderLink className="rightLink addButton modalTrigger" />
            <span>Add team</span>
          </a>
        }
        closeIcon
      >
        {/* <Modal.Header >New Team</Modal.Header> */}
        <Modal.Content>
          <Modal.Description>
            <Header>Create new team</Header>
            <AddTeamForm onSubmit={this.props.submit} projects={null} />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default AddTeamModal;
