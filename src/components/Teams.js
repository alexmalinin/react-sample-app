import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
  showClientTeams,
  showSpecialistTeams,
  showConfirmationModal
} from "../actions/actions";
import { Container, ContainerLarge } from "../styleComponents/layout/Container";
import TeamSubHeader from "./layout/TeamSubHeader";
import StyledTeamPage from "../styleComponents/StyledTeamPage";
import Team from "./layout/Team";
import { PORT } from "../constants/constants";
import { CUSTOMER, S_CORE, S_REDGUY } from "../constants/user";
import { getUserRole, createNotification } from "../helpers/functions";

class Teams extends Component {
  componentWillMount() {
    if (!this.props.teams) {
      this.showTeams();
    }
  }

  showTeams = () => {
    const { showClientTeams, showSpecialistTeams } = this.props;

    if (getUserRole() === CUSTOMER) {
      showClientTeams();
    } else if (getUserRole() === S_CORE || getUserRole() === S_REDGUY) {
      showSpecialistTeams();
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.createCustomTeam) {
      if (this.props.createCustomTeam !== nextProps.createCustomTeam) {
        this.showTeams();
      }
    }
  }

  removeTeam = team => {
    const { id, name, specialist_id } = team;

    this.props.showConfirmationModal({
      type: "delete",
      message: `Are you sure you want to delete ${
        name ? `${name} team?` : "this team?"
      }`,
      callback: () => {
        axios({
          method: "DELETE",
          url: `${PORT}/api/v1/teams/${id}/remove_team/${specialist_id}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`
          }
        })
          .then(res => {
            let name = res.data.name;

            createNotification({
              type: "success",
              text: `${name ? `${name} team ` : "Team"} was deleted`
            });

            this.showTeams();
          })
          .catch(error => {
            createNotification({
              type: "error"
            });

            console.error(error);
          });
      }
    });
  };

  renderToDashboard() {
    const { teams, specialistData } = this.props;

    return (
      <ContainerLarge>
        <StyledTeamPage>
          <TeamSubHeader specialistId={specialistData && specialistData.id} />
          <Container sidebarCondition>
            {teams && teams.length > 0 ? (
              teams.map((team, key) => (
                <Team
                  key={key}
                  team={team}
                  removeTeam={this.removeTeam}
                  specialistId={specialistData && specialistData.id}
                />
              ))
            ) : (
              <div className="teams-placeholder">
                <p>No teams for now</p>
              </div>
            )}
          </Container>
        </StyledTeamPage>
      </ContainerLarge>
    );
  }

  renderToRightSidebar() {
    const { teams } = this.props;

    return (
      <StyledTeamPage>
        <div className="team-tab-project">
          {teams && teams.length > 0 ? (
            teams.map(
              (team, key) =>
                team && <Team key={key} team={team} renderToRightSidebar />
            )
          ) : (
            <div className="teams-placeholder">
              <p>No teams for now</p>
            </div>
          )}
        </div>
      </StyledTeamPage>
    );
  }

  render() {
    const { renderToRightSidebar } = this.props;

    return renderToRightSidebar
      ? this.renderToRightSidebar()
      : this.renderToDashboard();
  }
}

const mapStateToProps = state => {
  return {
    specialistData: state.specialistData,
    changeUserType: state.changeUserType,
    createCustomTeam: state.createCustomTeam
  };
};

export default connect(mapStateToProps, {
  showClientTeams,
  showSpecialistTeams,
  showConfirmationModal
})(Teams);
