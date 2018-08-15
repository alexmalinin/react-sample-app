import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import moment from "moment";

import Dashboard from "./Dashboard";

import { projectsOperations } from "@ducks/projects";

import { PORT, getUserUrl } from "@utilities";

class DashboardContainer extends Component {
  state = {
    summary: []
  };

  componentDidMount() {
    const { userId, usertype, showAllProjects } = this.props;

    showAllProjects();

    const user = getUserUrl(usertype);

    axios({
      method: "GET",
      url: `${PORT}/api/v1/${user}/${userId}/dashboard`
    })
      .then(({ data }) => this.setState({ summary: data }))
      .catch(error => console.error(error));
  }

  getEtaForWeek(array = [], week = false) {
    const start = week ? moment().startOf("week") : moment().startOf("day"),
      end = moment().endOf("week");
    let etaTasks = [];

    etaTasks = array
      ? array.filter(task => {
          return (
            moment(task.eta).isBetween(start, end) ||
            moment(task.eta).isSame(start)
          );
        })
      : null;

    return etaTasks.sort((a, b) => {
      return new Date(a.eta) - new Date(b.eta);
    });
  }

  assignProjectName = (epics = []) => {
    const { projects } = this.props;

    epics.forEach(epic => {
      let proj = null;

      if (projects) {
        proj = Object.keys(projects).filter(
          id => projects[id] === epic.project_id
        );
      }

      epic["project_name"] = proj && proj.length > 0 ? proj[0].name : "Unnamed";
    });

    return epics;
  };

  render() {
    const { summary } = this.state;
    const { projects } = this.props;

    let allEpics = [];

    Object.keys(projects).forEach(id => {
      projects[id].epics && allEpics.push(...projects[id].epics);
    });

    return (
      <Dashboard
        {...this.props}
        summary={summary}
        allEpics={allEpics}
        getEtaForWeek={this.getEtaForWeek}
        assignProjectName={this.assignProjectName}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    user,
    projectsReducer: { projects }
  } = state;

  return {
    userId: user.id,
    usertype: user.type,
    projects
  };
};

export default connect(mapStateToProps, {
  showAllProjects: projectsOperations.showAllProjects
})(DashboardContainer);
