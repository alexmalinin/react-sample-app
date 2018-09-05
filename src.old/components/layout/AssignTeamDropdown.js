import React, { Component } from "react";
import { connect } from "react-redux";
import { Input, Tab, Loader } from "semantic-ui-react";
import { StyledAssignDropdown } from "../../styleComponents/layout/StyledAssignDropdown";
import { IMAGE_PORT, PORT, BLANK_AVATAR } from "../../constants/constants";
import {
  getUserRole,
  createNotification,
  getUserId
} from "../../helpers/functions";
import {
  searchSpecialist,
  showSpecialistCustomTeams
} from "../../actions/actions";
import StyledTab from "../../styleComponents/StyledTab";
import Axios from "axios";
import { getSpecialistId } from "../../helpers/selectors";

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

  openDropdown = e => {
    e.stopPropagation();
    this.fetchTeams();

    this.setState(
      {
        showDropdown: true
      },
      () => {
        document.addEventListener("click", this.closeDropdown);
      }
    );
  };

  closeDropdown = e => {
    if (this.dropdown && !this.dropdown.contains(e.target)) {
      this.setState(
        {
          showDropdown: false
        },
        () => {
          document.removeEventListener("click", this.closeDropdown);
        }
      );
    }
  };

  handleCloseButton = e => {
    this.setState(
      {
        showDropdown: false
      },
      () => {
        document.removeEventListener("click", this.closeDropdown);
      }
    );
  };

  fetchTeams = () => {
    const { specialistId } = this.props;

    if (specialistId) {
      this.props.showSpecialistCustomTeams(specialistId);
    }
  };

  handleSearch = (e, data) => {
    this.setState({
      teamInput: data.value
    });
  };

  searchSpecs = e => {
    e.preventDefault();
    this.setState({ searching: true });
    Axios({
      method: "GET",
      url: `${PORT}/api/v1/specialists/search?query=${this.state.specInput}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`
      }
    })
      .then(resp => {
        this.setState({ specialists: resp.data, searching: false });
      })
      .catch(err => {
        console.error(err);
        this.setState({ searching: false });
      });
  };

  handleAssignTeam = e => {
    const teamId = e.target.getAttribute("data");

    this.props.handleAssignTeam(teamId);
    this.handleCloseButton();
  };

  inviteSpecialist = e => {
    const specialistId = e.target.getAttribute("data");

    const {
      projectWithId: {
        project: { id, team }
      }
    } = this.props;
    Axios({
      method: "POST",
      url: `${PORT}/api/v1/projects/${id}/teams/${
        team.id
      }/specialist_invitation/${specialistId}`,

      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`
      }
    })
      .then(response => {
        createNotification({
          type: "success",
          text: "Specialist was invited"
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
    this.handleCloseButton();
  };

  render() {
    const { renderToModal, userType, specialistCustomTeams } = this.props;
    const {
      assignedIds,
      teamInput,
      specInput,
      specialists,
      searching,
      showDropdown
    } = this.state;
    const renderCondition = userType.some(type => type === getUserRole());

    const panes = [
      {
        menuItem: "members",
        render: () => (
          <Tab.Pane>
            <Input
              type="text"
              placeholder="Search specialists"
              name="searchSpec"
              fluid
              onChange={e => this.setState({ specInput: e.target.value })}
              value={specInput}
              loading={searching}
              autoComplete="off"
              onKeyDown={e => {
                if (e.keyCode === 13) {
                  e.preventDefault();
                  this.searchSpecs(e);
                }
              }}
            />
            <div className="dropdown-list">
              {specialists &&
                specialists
                  .filter(spec => spec.id !== getUserId())
                  .map((specialist, key) => (
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
                            : BLANK_AVATAR
                        }
                        alt="member"
                      />
                      {specialist.first_name + " " + specialist.last_name}
                    </div>
                  ))}
              {!specialists && (
                <span className="noResults">Start searching</span>
              )}
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
              onKeyDown={e => e.keyCode === 13 && e.preventDefault()}
            />
            <div className="dropdown-list">
              {specialistCustomTeams ? (
                specialistCustomTeams
                  .filter(team =>
                    team.name.match(new RegExp(`${teamInput}`, "i"))
                  )
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
        <StyledAssignDropdown team blue renderToModal={renderToModal}>
          <a className="dropdownTrigger" onClick={this.openDropdown}>
            <span className="plus">&nbsp;</span>
          </a>
          {showDropdown && (
            <div className="dropdown" ref={el => (this.dropdown = el)}>
              <StyledTab
                panes={panes}
                onTabChange={this.handleTabChange}
                defaultActiveIndex={1}
              />
            </div>
          )}
        </StyledAssignDropdown>
      )
    );
  }
}

const mapStateToProps = () => {
  const makeSpecialistId = getSpecialistId();

  return state => {
    const {
      specialistCustomTeams,
      searchResult,
      projectWithId,
      specialistData
    } = state;

    return {
      specialistId: makeSpecialistId(specialistData),
      specialistCustomTeams,
      searchResult,
      projectWithId
    };
  };
};

export default connect(mapStateToProps, {
  showSpecialistCustomTeams,
  searchSpecialist
})(AssignTeamDropdown);
