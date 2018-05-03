import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, GridRow, Divider } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { showAllTeams } from "../actions/actions";
import HeaderBasic from "./layout/HeaderBasic";
import SubHeader from "./layout/SpecialistsSubHeader";
import { DvTitle, DvTitleSmall } from "../styleComponents/layout/DvTitles";
import { DvButton } from "../styleComponents/layout/DvButton";
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

export default connect(({ changeUserType }) => ({ changeUserType }), {
  showAllTeams
})(Teams);
