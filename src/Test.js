import React, { Component } from "react";
import { connect } from "react-redux";
import { getSkills } from "./state/ducks/skills/operations";
import {
  showUserData,
  updateUserProfile,
  updateSpecialistIndustry,
  updateCompany,
  updateBillings,
  editEducationCardWithId,
  editExperienceCardWithId
} from "./state/ducks/users/operations";
import { getIndustries } from "./state/ducks/industries/operations";
import {
  showTeams,
  showCustomTeams,
  createCustomTeam,
  removeCustomTeam
} from "./state/ducks/teams/operations";
import {
  showChannels,
  createTeamChannel,
  deleteTeamChannel,
  updateTeamChannel
} from "./state/ducks/channels/operations";
import {
  showEpicTasks,
  createEpicTask,
  deleteEpicTask
} from "./state/ducks/tasks/operations";

import {
  showAllProjects,
  saveCreatedProgect
} from "./state/ducks/projects/operations";

import {
  showAllEpics,
  createProjectEpic,
  deleteProjectEpic
} from "./state/ducks/epics/operations";

import { NotificationContainer } from "react-notifications";

class Test extends Component {
  componentDidMount() {
    // this.props.showUserData();
    // this.props.showAllEpics(52);
    // this.props.showAllEpics(53);
    // this.props.getSkills();
    // this.props.getIndustries();
    // this.props.showTeams(59);
    // this.props.showChannels(80);
    // this.props.showEpicTasks(92);
    // this.props.showAllProjects(59);

    setTimeout(() => {
      // this.props.deleteProjectEpic(53, 103);
      // this.props.createProjectEpic(
      //   {
      //     name: "Cool epic",
      //     project_id: 53,
      //     user_story: "dasasd",
      //     business_requirements: "business_requirements"
      //   },
      //   53
      // );
      // this.props.editEducationCardWithId(
      //   {
      //     education: {
      //       name: "abracada",
      //       specialisation: "specialisation",
      //       started_at: "09-06-2013",
      //       finished_at: "09-06-2017",
      //       degree: "degree",
      //       description: "description"
      //     }
      //   },
      //   37
      // );
      // this.props.editExperienceCardWithId(
      //   {
      //     work_experience: {
      //       name: "Codica@228",
      //       country: "Ukraine@22",
      //       city: "Kharkivvv",
      //       position: "Developer",
      //       started_at: "09-06-2013",
      //       finished_at: "09-06-2017",
      //       description: "Amet quide"
      //     }
      //   },
      //   10
      // );
      // this.props.updateBillings({
      //   billing_type: 0,
      //   card_name: "jhjashdas"
      // });
      // this.props.updateCompany({
      //   name: "Company@@",
      //   industry: { value: "sdd" },
      //   number_of_employers: { value: 233 },
      //   segment: { value: 233 }
      // });
      // this.props.updateSpecialistIndustry({
      //   job_title: { label: "Junior", value: "Junior" },
      //   project_type: { label: "Junior", value: "Junior" },
      //   experience_level: { label: "Junior", value: "Junior" },
      //   industry_area_id: { label: 22, value: 22 },
      //   specialist_skills_attributes: null
      // });
      // this.props.updateUserProfile({ profile: { first_name: "Yura RED" } });
      // this.props.saveCreatedProgect({
      //   name: "ROROOR",
      //   user_story: "some user story",
      //   customer_id: { label: 36, value: 36 }
      // });
      // this.props.removeCustomTeam({ id: 620, specialist_id: 59 });
      // this.props.deleteEpicTask(92, 234);
      // this.props.createEpicTask(
      //   { name: "Hello", description: "How are toy", user_story: "adasdadsd" },
      //   92
      // );
      // this.props.createCustomTeam({ name: "Roma" }, 59);
      // this.props.showCustomTeams(59);
      // this.props.deleteTeamChannel(80, 956);
      // this.props.createTeamChannel(80, { name: "FIFA@@" });
      // this.props.updateTeamChannel(80, 933, { name: "Bladlad" });
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
  updateSpecialistIndustry,
  updateCompany,
  updateBillings,
  editEducationCardWithId,
  editExperienceCardWithId,
  getIndustries,
  showTeams,
  showCustomTeams,
  createCustomTeam,
  showChannels,
  createTeamChannel,
  deleteTeamChannel,
  updateTeamChannel,
  showEpicTasks,
  createEpicTask,
  deleteEpicTask,
  removeCustomTeam,
  showAllProjects,
  saveCreatedProgect,
  showAllEpics,
  createProjectEpic,
  deleteProjectEpic
})(Test);
