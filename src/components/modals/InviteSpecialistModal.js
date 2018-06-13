import React, { Component } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import { Modal, Tab, Grid } from "semantic-ui-react";
import { DvBlueButton } from "../../styleComponents/layout/DvButton";
import StyledModal from "../../styleComponents/layout/StyledModal";
import InviteSpecialistForm from "../forms/InviteSpecialistForm";
import { PORT } from "../../constans/constans";

class InviteSpecialistModal extends Component {
  state = {
    opened: false
  };

  open = () => {
    this.setState({ opened: true });
  };

  close = () => {
    this.setState({ opened: false });
  };

  submit = ({ project, team }) => {
    const { specialistId, specialistProjects, handleMessage } = this.props;

    this.close();

    if (project) {
      const proj =
        specialistProjects &&
        specialistProjects.find(proj => proj.id === project);

      const teamId = proj && proj.team.id;

      return Axios({
        method: "POST",
        url: `${PORT}/api/v1/projects/${project}/teams/${teamId}/specialist_invitation/${specialistId}`
      })
        .then(responce => {
          handleMessage("renderMessage", true);
          setTimeout(() => {
            handleMessage("renderMessage", false);
            handleMessage("renderErrorMessage", false);
          }, 2500);
        })
        .catch(error => {
          console.log(error);
          handleMessage("renderErrorMessage", true);
          setTimeout(() => {
            handleMessage("renderMessage", false);
            handleMessage("renderErrorMessage", false);
          }, 2500);
        });
    }

    if (team) {
      return Axios({
        method: "POST",
        url: `${PORT}/api/v1/teams/${team}/specialist_team_invitation/${specialistId}`
      })
        .then(respose => {
          handleMessage("renderMessage", true);
          setTimeout(() => {
            handleMessage("renderMessage", false);
            handleMessage("renderErrorMessage", false);
          }, 2500);
        })
        .catch(error => {
          console.log(error);
          handleMessage("renderErrorMessage", true);
          setTimeout(() => {
            handleMessage("renderMessage", false);
            handleMessage("renderErrorMessage", false);
          }, 2500);
        });
    }
  };

  render() {
    const { opened } = this.state;

    return (
      <StyledModal
        closeIcon={<button className="close icon" onClick={this.close} />}
        open={opened}
        size="tiny"
        trigger={
          <DvBlueButton
            onClick={this.open}
            role="button"
            className="dv-blue"
            fluid
          >
            Invite
          </DvBlueButton>
        }
      >
        <Modal.Content>
          <Modal.Description>
            <InviteSpecialistForm
              onSubmit={this.submit}
              projectId={this.props.projectId}
            />
          </Modal.Description>
        </Modal.Content>
      </StyledModal>
    );
  }
}

export default connect(({ specialistProjects }) => ({ specialistProjects }))(
  InviteSpecialistModal
);
