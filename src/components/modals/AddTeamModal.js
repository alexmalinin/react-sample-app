import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, Modal } from "semantic-ui-react";
import { createCustomTeam } from "../../actions/actions";
import StyledSubHeaderLink from "../../styleComponents/StyledSubHeaderLink";
import AddTeamForm from "../forms/AddTeamForm";

class AddTeamModal extends Component {
  componentWillMount() {
    // console.log('modal loaded')
  }

  render() {
    // console.log(this.props)

    return (
      <Modal
        size="tiny"
        trigger={
          <a className="button">
            <StyledSubHeaderLink className="rightLink addButt" />Add team
          </a>
        }
        closeIcon
      >
        {/* <Modal.Header >New Team</Modal.Header> */}
        <Modal.Content>
          <Modal.Description>
            <Header>Create new team</Header>
            <AddTeamForm projects={null} />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }

  submit = data => {
    let close = document.querySelector("i.close.icon");
    let { currentEpicId, createEpicTask } = this.props;
    close.click();
    createEpicTask(data, currentEpicId);
  };
}

export default connect(({ allprojects }) => ({ allprojects }), {})(
  AddTeamModal
);
