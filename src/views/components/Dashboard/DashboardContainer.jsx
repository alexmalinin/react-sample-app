import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import axios from "axios";

import Dashboard from "./Dashboard";

import { projectsOperations } from "@ducks/projects";

import { PORT, getUserUrl } from "@utilities";

class DashboardContainer extends Component {
  state = {
    summary: null
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

  render() {
    const { summary } = this.state;

    return (
      <Fragment>
        <Dashboard {...this.props} summary={summary} />
      </Fragment>
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
