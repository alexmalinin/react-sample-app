import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import moment from "moment";

import Dashboard from "./Dashboard";

import { getAllProjects } from "@ducks/projects/actions";

import { PORT, getUserUrl } from "@utilities";

class DashboardContainer extends Component {
  state = {
    summary: []
  };

  componentDidMount() {
    const { userId, usertype, getAllProjects } = this.props;

    getAllProjects();

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
        proj = projects.allIds.filter(
          id => projects.byId[id] === epic.project_id
        );
      }

      epic["project_name"] = proj && proj.length > 0 ? proj[0].name : "Unnamed";
    });

    return epics;
  };

  render() {
    const { summary } = this.state;
    const { epics } = this.props;

    let allEpics = Object.keys(epics).map(id => epics[id]);

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
  return {
    userId: state.user.id,
    usertype: state.user.type,
    projects: state.projects,
    epics: state.epics
  };
};

export default connect(mapStateToProps, {
  getAllProjects
})(DashboardContainer);
