import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Dimmer } from "semantic-ui-react";

import { ContainerLarge } from "../styleComponents/layout/Container";
import { S_Board } from "../styleComponents/S_Board";
import BoardSubHeader from "./layout/BoardSubHeader";
import ModuleCard from "./layout/ModuleCard";
import KanbanBoard from "./layout/KanbanBoard";
import EditProject from "./forms/hoc/EditProject";
import EditModule from "./EditModule";
import NotFound from "./NotFound";

import {
  showAllProjects,
  showAllEpics,
  showEpicTasks,
  showProjectTeam,
  showProjectWithId,
  showProjectEpic
} from "../actions/actions";
import { CLIENT, SPECIALIST, S_REDGUY } from "../constants/user";
import { getUserRole, getUserType, difference } from "../helpers/functions";
import { run } from "../helpers/scrollToElement";

class ProjectsBoard extends Component {
  state = {
    specialists: [],
    fetchEpicTasks: true,
    myTasks: false
  };

  componentDidMount() {
    const {
      showAllEpics,
      showProjectTeam,
      showProjectWithId,
      projectWithId,
      match: {
        params: { projectId }
      }
    } = this.props;
    showAllEpics(projectId);
    showProjectTeam(projectId);
    if (!projectWithId && projectId) {
      showProjectWithId(projectId);
    }
    run(0)();
  }

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

    if (nextProps.deleteEpic) {
      if (this.props.deleteEpic !== nextProps.deleteEpic) {
        nextProps.showAllEpics(nextProps.projectId);
      }
    }

    if (nextProps.createEpic && nextProps.createEpic.successEpicId) {
      if (this.props.createEpic) {
        if (
          this.props.createEpic.successEpicId !==
          nextProps.createEpic.successEpicId
        ) {
          nextProps.showAllEpics(nextProps.projectId);
        }
      } else nextProps.showAllEpics(nextProps.projectId);
    }

    if (epicId) {
      if (this.props.epicTasks.loaded) {
        if (this.props.match.params.moduleId !== currentEpic) {
          nextProps.showProjectEpic(projectId, epicId);
          nextProps.showEpicTasks(epicId);
        }
      } else if (this.state.fetchEpicTasks) {
        nextProps.showProjectEpic(projectId, epicId);
        nextProps.showEpicTasks(epicId);
        this.setState({ fetchEpicTasks: false });
      }
    }

    if (nextProps.assignSpecialist) {
      if (this.props.assignSpecialist) {
        if (this.props.assignSpecialist != nextProps.assignSpecialist) {
          nextProps.showEpicTasks(epicId);
        }
      } else nextProps.showEpicTasks(epicId);
    }

    if (nextProps.removeSpecialist) {
      if (this.props.removeSpecialist) {
        if (this.props.removeSpecialist !== nextProps.removeSpecialist) {
          nextProps.showEpicTasks(epicId);
        }
      } else nextProps.showEpicTasks(epicId);
    }

    if (nextProps.projectTeam) {
      if (nextProps.projectTeam.project_id === +projectId) {
        this.setState({ specialists: nextProps.projectTeam.specialists });
      }
    }
  }

  toggleMyTasks = () => {
    this.setState({ myTasks: !this.state.myTasks });
  };

  renderProjectBoard() {
    const {
      epicTasks: { tasks, loaded, loading },
      match: {
        params: { status }
      }
    } = this.props;

    return (
      <S_Board className={loading ? "loading" : ""}>
        {!loaded && loading && <p className="noTasks">Loading</p>}
        {loaded && !!tasks.length ? (
          <KanbanBoard
            tasks={tasks}
            myTasks={this.state.myTasks}
            specialists={this.state.specialists}
          />
        ) : (
          <p className="noTasks">There is no tasks yet</p>
        )}
      </S_Board>
    );
  }

  renderProjectPage = () => {
    const {
      showAllEpics,
      allEpics: { loaded, epics },
      match: {
        params: { projectId, moduleId }
      },
      history
    } = this.props;

    if (moduleId) {
      this.renderProjectBoard();
    } else {
      return (
        <S_Board>
          <EditProject projectId={projectId} />
          <div className="moduleWrapper">
            {loaded &&
              epics.map((epic, key) => (
                <ModuleCard
                  epic={epic}
                  key={key}
                  number={key + 1}
                  project={projectId}
                  updateEpicList={showAllEpics}
                  history={history}
                />
              ))}
            {(getUserType() === CLIENT || getUserRole() === S_REDGUY) && (
              <div className="dragContainer addModuleContainer">
                <h3>&nbsp;</h3>
                <div className="module addModule">
                  <NavLink
                    to={`/dashboard/project/${projectId}/module/new`}
                    className="addButton"
                  >
                    <span className="plus" />
                    <span className="add">Add module</span>
                  </NavLink>
                </div>
              </div>
            )}
            {getUserType() === SPECIALIST &&
              loaded &&
              epics.length === 0 && (
                <div className="noModules">
                  <p>No modules yet</p>
                </div>
              )}
          </div>
        </S_Board>
      );
    }
  };

  renderModulePage = () => {
    const {
      match: {
        params: { moduleId, projectId }
      },
      allEpics: { epics, loaded },
      history
    } = this.props;
    //make edit module dependent on show epic
    return (
      loaded && (
        <EditModule
          currentEpic={moduleId}
          epicId={epics[moduleId - 1].id}
          projectId={projectId}
          history={history}
        />
      )
    );
  };

  renderContent = status => {
    switch (status) {
      case "view":
        return this.renderProjectBoard();
      case "edit":
        return this.renderModulePage();
      default:
        return this.renderProjectPage();
    }
  };

  render() {
    const {
      projectWithId: { error },
      match: {
        params: { status }
      }
    } = this.props;

    if (error) {
      switch (error.response.status) {
        case 404:
          return <NotFound />;
        case 500:
          return (
            <S_Board>
              <p className="resp-error">
                You are not authorized to access this page
              </p>
            </S_Board>
          );
        default:
          return <NotFound />;
      }
    }

    return (
      <ContainerLarge indentBot>
        <BoardSubHeader
          toggleMyTasks={this.toggleMyTasks}
          myTasks={this.state.myTasks}
        />

        {this.renderContent(status)}
      </ContainerLarge>
    );
  }
}

const mapStateToProps = state => {
  return {
    showEpic: state.showEpic,
    allEpics: state.allEpics,
    deleteEpic: state.deleteEpic,
    createEpic: state.createEpic,
    epicTasks: state.epicTasks,
    assignSpecialist: state.assignSpecialist,
    removeSpecialist: state.removeSpecialist,
    projectWithId: state.projectWithId,
    projectTeam: state.projectTeam
  };
};

export default withRouter(
  connect(mapStateToProps, {
    showAllProjects,
    showAllEpics,
    showProjectEpic,
    showEpicTasks,
    showProjectTeam,
    showProjectWithId
  })(ProjectsBoard)
);
