import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import StyledBoard from "@styled/Board";
import Kanban from "./Kanban";

class ProjectsBoard extends Component {
  state = {
    specialists: [],
    fetchEpicTasks: true
  };

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    const {
      match: {
        params: { moduleId: currentEpic, projectId }
      },
      allEpics: { epics, loaded },
      projectWithId: { project, loaded: projLoaded, projError }
    } = nextProps;
    let epicId;

    if (loaded && currentEpic && Number.isInteger(+currentEpic) && projectId) {
      if (+currentEpic > epics.length) {
        nextProps.history.push(
          `/dashboard/project/${projectId}/module/${epics.length}/view`
        );
      } else epicId = epics[currentEpic - 1].id;
    }

    if (projLoaded) {
      if (!projError) {
        document.title = `${project.name} | Digital Village`;
      } else {
        if (projError.response.status === 404) {
          document.title = `Not found | Digital Village`;
        }
        if (projError.response.status === 500) {
          document.title = `No access | Digital Village`;
        }
      }
    }

    if (nextProps.projectTeam) {
      if (nextProps.projectTeam.project_id === +projectId) {
        this.setState({ specialists: nextProps.projectTeam.specialists });
      }
    }

    if (nextProps.createTask) {
      if (this.props.createTask) {
        if (this.props.createTask !== nextProps.createTask) {
          nextProps.showEpicTasks(epicId);
        }
      } else nextProps.showEpicTasks(epicId);
    }
  }

  toggleMyTasks = () => {
    this.setState({ myTasks: !this.state.myTasks });
  };

  render() {
    const {
      tasks: { loading, loaded, allTasks }
    } = this.props;

    return (
      <StyledBoard className={loading ? "loading" : ""}>
        {!loaded && loading && <p className="noTasks">Loading</p>}
        {loaded &&
          (!!allTasks.length ? (
            <Kanban
              tasks={allTasks}
              myTasks={this.state.myTasks}
              specialists={this.state.specialists}
            />
          ) : (
            <p className="noTasks">There is no tasks yet</p>
          ))}
      </StyledBoard>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks
  };
};

const mapDispatchToProps = {};

export default withRouter(connect(mapStateToProps)(ProjectsBoard));
