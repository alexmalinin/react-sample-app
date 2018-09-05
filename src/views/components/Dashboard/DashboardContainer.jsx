import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import Dashboard from "./Dashboard";

import { getAllProjects } from "@ducks/projects/actions";
import { getEpicTasks } from "@ducks/tasks/actions";

import { PORT, SPECIALIST, S_REDGUY, getUserUrl } from "@utilities";

class DashboardContainer extends Component {
  state = {
    summary: [],
    fetch: true,
    epics: [],
    tasks: []
  };

  componentDidMount() {
    const { userId, usertype } = this.props;

    this.props.getAllProjects();

    const user = getUserUrl(usertype);

    axios({
      method: "GET",
      url: `${PORT}/api/v1/${user}/${userId}/dashboard`
    })
      .then(({ data }) => this.setState({ summary: data }))
      .catch(error => console.error(error));

    axios({
      method: "GET",
      url: `${PORT}/api/v1/${user}/${userId}/week_module`
    })
      .then(({ data }) => this.setState({ epics: data }))
      .catch(error => console.error(error));

    axios({
      method: "GET",
      url: `${PORT}/api/v1/${user}/${userId}/week_tasks`
    })
      .then(({ data }) => this.setState({ tasks: data }))
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

  assignProjectName = (tasks = []) => {
    const { projects } = this.props;

    tasks.forEach(task => {
      let proj = null;

      if (projects.loaded) {
        proj = task.project_id;
      }

      task["project_name"] = proj ? projects.byId[proj].name : "Unnamed";
    });

    return tasks;
  };

  renderDefault = () => {
    const { usertype, userRole } = this.props;

    if (usertype === SPECIALIST && userRole !== S_REDGUY) {
      return (
        <div className="default-dashboard">
          <h1>Welcome to the digital village</h1>
          <p>Well....What happens now?</p>

          <p>
            We review your profile and one of our Producers will match you to a
            client and invite you to a Project.
          </p>

          <p>
            (So make sure your profile indicates all your capabilities and skill
            sets so you don’t miss out)
          </p>

          <p>
            <NavLink className="link-green" to="/profile/info?edit">
              Update Profile
            </NavLink>
          </p>

          <p>See what Digital Village Events are coming up!</p>

          <p>
            <a
              className="link-purple"
              href="https://digitalvillage.network/meetups/"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Meetups
            </a>
          </p>
        </div>
      );
    } else {
      return <div className="default">There are no projects</div>;
    }
  };

  render() {
    const { summary, epics, tasks } = this.state;
    const { getEpicTasks } = this.props;

    return (
      <Dashboard
        {...this.props}
        summary={summary}
        allEpics={epics}
        tasks={tasks}
        getEpicTasks={getEpicTasks}
        getEtaForWeek={this.getEtaForWeek}
        assignProjectName={this.assignProjectName}
        renderDefault={this.renderDefault}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userId: state.user.id,
    usertype: state.user.type,
    userRole: state.user.role,
    projects: state.projects
  };
};

export default connect(mapStateToProps, {
  getAllProjects,
  getEpicTasks
})(DashboardContainer);
