import React, { Component } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import { Modal } from "semantic-ui-react";

import { DvBlueButton } from "@styled/DVButton";
import StyledModal from "@styled/Modal";
import InviteSpecialistForm from "./forms/InviteSpecialistForm";
import { PORT, createNotification } from "@utilities";

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
    const { specialistId, specialistProjects } = this.props;
    const token = localStorage.getItem("jwt_token");

    this.close();

    if (project) {
      const proj =
        specialistProjects &&
        specialistProjects.find(proj => proj.id === project);

      const teamId = proj && proj.team.id;

      return Axios({
        method: "POST",
        url: `${PORT}/api/v1/projects/${project}/teams/${teamId}/specialist_invitation/${specialistId}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          createNotification({
            type: "success",
            text: "Specialist was invited to project"
          });
        })
        .catch(error => {
          const {
            response: { data }
          } = error;

          createNotification({
            type: data && data.errors ? "warning" : "error",
            text: data && data.errors
          });

          console.error(error);
        });
    }

    if (team) {
      return Axios({
        method: "POST",
        url: `${PORT}/api/v1/teams/${team}/specialist_team_invitation/${specialistId}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          createNotification({
            type: "success",
            text: "Specialist was invited to team"
          });
        })
        .catch(error => {
          const {
            response: { data }
          } = error;

          createNotification({
            type: data && data.errors ? "warning" : "error",
            text: data && data.errors
          });

          console.error(error);
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
            uppercase="true"
            fontSize={14}
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
