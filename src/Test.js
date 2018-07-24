import React, { Component } from "react";
import { connect } from "react-redux";
import { getSkills } from "./state/ducks/skills/operations";
import { showUserData, updateUserProfile } from "./state/ducks/user/operations";
import { getIndustries } from "./state/ducks/industries/operations";
import {
  showTeams,
  showCustomTeams,
  createCustomTeam
} from "./state/ducks/teams/operations";
import {
  showChannels,
  createTeamChannel,
  deleteTeamChannel,
  updateTeamChannel
} from "./state/ducks/channels/operations";
import { showEpicTasks } from "./state/ducks/tasks/operations";
import { NotificationContainer } from "react-notifications";

class Test extends Component {
  componentDidMount() {
    // this.props.getSkills();
    // this.props.showUserData("specialist", 59);
    // this.props.updateUserProfile({ profile: { first_name: "red" } }, {});
    // this.props.getIndustries();

    // this.props.showTeams(59);

    // this.props.showChannels(80);
    this.props.showEpicTasks(92);

    setTimeout(() => {
      // this.props.createCustomTeam({ name: "RAZER" }, 59);
      // this.props.showCustomTeams(59);
      // this.props.deleteTeamChannel(80, 946);
      // this.props.createTeamChannel(80, { name: "FIFA" });
      // this.props.updateTeamChannel(80, 933, { name: "Rexter" });
    }, 5000);
  }

  render() {
    return (
      <div>
        <div>Hello world!</div>
        <NotificationContainer />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    skills: state.skills
  };
};

export default connect(mapStateToProps, {
  getSkills,
  showUserData,
  updateUserProfile,
  getIndustries,
  showTeams,
  showCustomTeams,
  createCustomTeam,
  showChannels,
  createTeamChannel,
  deleteTeamChannel,
  updateTeamChannel,
  showEpicTasks
})(Test);
