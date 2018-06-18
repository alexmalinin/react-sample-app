import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { showClientTeams, showSpecialistTeams } from "../actions/actions";
import { Container, ContainerLarge } from "../styleComponents/layout/Container";
import TeamSubHeader from "./layout/TeamSubHeader";
import StyledTeamPage from "../styleComponents/StyledTeamPage";
import Team from "./layout/Team";
import { PORT, CUSTOMER, CLIENT, S_CORE, S_REDGUY } from "../constans/constans";
import { getUserRole } from "../helpers/functions";
import { Message } from "semantic-ui-react";
import { S_Message } from "../styleComponents/layout/S_Message";

class Teams extends Component {
  state = {
    renderMessage: false,
    renderErrorMessage: false
  };

  componentWillMount() {
    this.showTeams();
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
    const { id, specialist_id } = team;

    return axios
      .delete(`${PORT}/api/v1/teams/${id}/remove_team/${specialist_id}`)
      .then(res => {
        this.setState({ renderMessage: true });
        setTimeout(() => {
          this.setState({ renderMessage: false, renderErrorMessage: false });
        }, 2500);

        this.showTeams();
      })
      .catch(error => {
        console.log(error);
        this.setState({ renderErrorMessage: true });
        setTimeout(() => {
          this.setState({ renderMessage: false, renderErrorMessage: false });
        }, 2500);
      });
  };

  renderToDashboard() {
    const { teams, changeUserType, specialistData } = this.props;
    const { renderMessage, renderErrorMessage } = this.state;

    return (
      <ContainerLarge>
        <StyledTeamPage>
          <TeamSubHeader
            userType={changeUserType}
            specialistId={specialistData && specialistData.id}
          />
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
              <div className="teamsPlaceholder">
                <p>No teams for now</p>
              </div>
            )}
          </Container>
        </StyledTeamPage>

        <S_Message positive profile="true" data-show={renderMessage}>
          <Message.Header>Success!</Message.Header>
          <p>Team was deleted</p>
        </S_Message>
        <S_Message negative profile="true" data-show={renderErrorMessage}>
          <Message.Header>Error!</Message.Header>
          <p>Something went wrong, please try again</p>
        </S_Message>
      </ContainerLarge>
    );
  }

  renderToRightSidebar() {
    const { teams } = this.props;

    return (
      <div className="team-tab-project">
        {teams && teams.length > 0 ? (
          teams.map(
            (team, key) =>
              team && <Team key={key} team={team} renderToRightSidebar />
          )
        ) : (
          <div className="teamsPlaceholder">
            <p>No teams for now</p>
          </div>
        )}
      </div>
    );
  }

  render() {
    const { renderToRightSidebar } = this.props;

    return renderToRightSidebar
      ? this.renderToRightSidebar()
      : this.renderToDashboard();
  }
}

export default connect(
  ({ specialistData, changeUserType, createCustomTeam, specialistTeams }) => ({
    specialistData,
    changeUserType,
    createCustomTeam,
    specialistTeams
  }),
  { showClientTeams, showSpecialistTeams }
)(Teams);
