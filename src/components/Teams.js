import React, { Component } from "react";
import { connect } from "react-redux";
import { showClientTeams, showSpecialistTeams } from "../actions/actions";
import { Container, ContainerLarge } from "../styleComponents/layout/Container";
import TeamSubHeader from "./layout/TeamSubHeader";
import StyledTeamPage from "../styleComponents/StyledTeamPage";
import Team from "./layout/Team";
import { CUSTOMER, CLIENT, S_CORE, S_REDGUY } from "../constans/constans";
import { getUserRole } from "../helpers/functions";

class Teams extends Component {
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

  renderToDashboard() {
    const { teams, changeUserType, specialistData } = this.props;

    return (
      <ContainerLarge>
        <StyledTeamPage>
          <TeamSubHeader
            userType={changeUserType}
            specialistId={specialistData && specialistData.id}
          />
          <Container sidebarCondition>
            {teams && teams.length > 0 ? (
              teams.map((team, key) => <Team key={key} team={team} />)
            ) : (
              <div className="teamsPlaceholder">
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
