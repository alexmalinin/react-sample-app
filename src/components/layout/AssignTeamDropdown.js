import React, { Component } from "react";
import { connect } from "react-redux";
import { Input, Tab, Loader, Form } from "semantic-ui-react";
import {
  StyledAssignDropdown,
  StyledDropdown
} from "../../styleComponents/layout/StyledAssignDropdown";
import { IMAGE_PORT, S_REDGUY, PORT } from "../../constans/constans";
import { getUserRole } from "../../helpers/functions";
import { showCustomTeams, searchSpecialist } from "../../actions/actions";
import StyledTab from "../../styleComponents/StyledTab";
import Axios from "axios";

class AssignTeamDropdown extends Component {
  state = {
    options: [],
    assignedIds: [],
    showDropdown: false,
    showDeleteConfirmation: false,
    teamInput: "",
    specInput: "",
    searching: false
  };

  fetchTeams = () => {
    if (!this.props.allCustomTeams) {
      this.props.showCustomTeams();
    }
  };

  handleSearch = (e, data) => {
    this.setState({
      teamInput: data.value
    });
  };

  searchSpecs = () => {
    this.setState({ searching: true });
    Axios({
      method: "GET",
      url: `${PORT}/api/v1/specialists/search?query=${this.state.specInput}`
    })
      .then(resp => {
        this.setState({ specialists: resp.data, searching: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ searching: false });
      });
  };

  handleAssignTeam = e => {
    const teamId = e.target.getAttribute("data");
    let type;

    if (e.target.className === "assigned") {
      type = "remove";
    } else type = "assign";

    this.props.handleAssignTeam(teamId);
  };

  inviteSpecialist = e => {
    const specialistId = e.target.getAttribute("data");

    const {
      projectWithId: { id, team }
    } = this.props;
    Axios({
      method: "POST",
      url: `${PORT}/api/v1/projects/${id}/teams/${
        team.id
      }/specialist_invitation/${specialistId}`
    });
  };

  render() {
    const { renderToModal, userType, allCustomTeams } = this.props;
    const {
      assignedIds,
      teamInput,
      specInput,
      specialists,
      searching
    } = this.state;
    const renderCondition = userType.some(type => type === getUserRole());

    const panes = [
      {
        menuItem: "members",
        render: () => (
          <Tab.Pane>
            <Form onSubmit={this.searchSpecs}>
              <Input
                type="text"
                placeholder="Search specialists"
                name="searchSpec"
                fluid
                onChange={e => this.setState({ specInput: e.target.value })}
                value={specInput}
                loading={searching}
                autoComplete="off"
              />
            </Form>
            <div className="dropdown-list">
              {specialists &&
                specialists.map((specialist, key) => (
                  <div
                    key={key}
                    data={specialist.id}
                    onClick={this.inviteSpecialist}
                  >
                    <img
                      data={specialist.id}
                      src={
                        specialist.avatar.url
                          ? IMAGE_PORT + specialist.avatar.url
                          : "/images/uploadImg.png"
                      }
                      alt="member"
                    />
                    {specialist.first_name + " " + specialist.last_name}
                  </div>
                ))}
              {specialists &&
                specialists.length === 0 && (
                  <span className="noResults">No results</span>
                )}
            </div>
          </Tab.Pane>
        )
      },
      {
        menuItem: "teams",
        render: () => (
          <Tab.Pane>
            <Input
              type="text"
              placeholder="Search teams"
              name="searchTeam"
              fluid
              input={<input type="text" autoComplete="off" />}
              onChange={this.handleSearch}
            />
            <div className="dropdown-list">
              {allCustomTeams ? (
                allCustomTeams
                  .filter(team => team.name.includes(teamInput))
                  .map((team, key) => (
                    <div
                      key={key}
                      data={team.id}
                      onClick={this.handleAssignTeam}
                      className={
                        assignedIds.indexOf(team.id) >= 0 ? "assigned" : ""
                      }
                    >
                      {team.name}
                    </div>
                  ))
              ) : (
                <Loader inline="centered" active />
              )}
            </div>
          </Tab.Pane>
        )
      }
    ];

    return (
      renderCondition && (
        <StyledAssignDropdown blue renderToModal={renderToModal}>
          <StyledDropdown
            on="click"
            onMount={this.fetchTeams}
            basic
            style={{ padding: 0, border: "none" }}
            position="bottom left"
            trigger={
              <a tabIndex="-1" className="dropdownTrigger">
                <span className="plus">&nbsp;</span>
              </a>
            }
          >
            <StyledTab
              panes={panes}
              onTabChange={this.handleTabChange}
              defaultActiveIndex={1}
            />
          </StyledDropdown>
        </StyledAssignDropdown>
      )
    );
  }
}

const mapStateToProps = ({ allCustomTeams, searchResult, projectWithId }) => ({
  allCustomTeams,
  searchResult,
  projectWithId
});

export default connect(mapStateToProps, { showCustomTeams, searchSpecialist })(
  AssignTeamDropdown
);
