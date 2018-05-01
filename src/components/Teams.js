import React, { Component } from "react";
import { connect } from "react-redux";
import { showAllTeams } from "../actions/actions";
import { Container, ContainerLarge } from "../styleComponents/layout/Container";
import TeamSubHeader from "./layout/TeamSubHeader";
import StyledTeamPage from "../styleComponents/StyledTeamPage";
import Team from "./layout/Team";
import { CLIENT } from "../constans/constans";

class Teams extends Component {
  componentWillMount() {
    const { showAllTeams, changeUserType } = this.props;

    changeUserType === CLIENT && showAllTeams();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.createCustomTeam) {
      if (this.props.createCustomTeam) {
        if (this.props.createCustomTeam !== nextProps.createCustomTeam) {
          nextProps.showAllTeams();
        }
      } else nextProps.showAllTeams();
    }
  }

  render() {
    const { teams } = this.props;

    return (
      <ContainerLarge>
        <StyledTeamPage>
          <TeamSubHeader />
          <Container sidebarCondition>
            {teams && teams.length !== 0 ? (
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
}

export default connect(
  ({ allTeams, createCustomTeam }) => ({ allTeams, createCustomTeam }),
  { showAllTeams }
)(Teams);
