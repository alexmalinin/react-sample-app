import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { ContainerLarge } from "../styleComponents/layout/Container";
import {
  showAllProjects,
  showAllEpics,
  showEpicTasks,
  showProjectTeam,
  showProjectWithId
} from "../actions/actions";
import { CLIENT, SPECIALIST, S_REDGUY } from "../constants/user";
import { S_Board } from "../styleComponents/S_Board";
import BoardSubHeader from "./layout/BoardSubHeader";
import ModuleCard from "./layout/ModuleCard";
import KanbanBoard from "./layout/KanbanBoard";
import { getUserRole, getUserType } from "../helpers/functions";
import EditProject from "./forms/hoc/EditProject";
import EditModule from "./EditModule";
import { run } from "../helpers/scrollToElement";

class ProjectsBoard extends Component {
  state = {
    fetchEpicTasks: true,
    myTasks: false
  };

  componentWillMount() {
    const {
      showAllEpics,
      showProjectTeam,
      showProjectWithId,
      projectWithId,
      projectId
    } = this.props;
    showAllEpics(projectId);
    showProjectTeam(projectId);
    if (!projectWithId && projectId) {
      showProjectWithId(projectId);
    }
    run(0)();
    // this.props.showAllProjects();
    // this.props.showAllEpics(this.props.projectId);
    // this.props.showProjectTeam(this.props.projectId);
  }

  componentWillReceiveProps(nextProps) {
    let epicId = null;
    if (
      nextProps.allEpics.epics.length &&
      nextProps.currentEpic !== "all" &&
      nextProps.projectId
    ) {
      if (+nextProps.currentEpic > nextProps.allEpics.epics.length) {
        epicId =
          nextProps.allEpics.epics[nextProps.allEpics.epics.length - 1].id;
        nextProps.history.push(
          `/dashboard/project/${nextProps.projectId}/module/all`
        );
      } else epicId = nextProps.allEpics.epics[nextProps.currentEpic - 1].id;
    }

    if (nextProps.projectWithId) {
      document.title = `${nextProps.projectWithId.name} | Digital Village`;
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
        if (this.props.currentEpic !== nextProps.currentEpic) {
          nextProps.showEpicTasks(epicId);
        }
      } else if (this.state.fetchEpicTasks) {
        nextProps.showEpicTasks(epicId);
        this.setState({ fetchEpicTasks: false });
      }
    }

    if (nextProps.createTask && nextProps.createTask.successId) {
      if (this.props.createTask) {
        if (this.props.createTask !== nextProps.createTask) {
          nextProps.showEpicTasks(epicId);
        }
      } else nextProps.showEpicTasks(epicId);
    }

    if (nextProps.deleteTask && nextProps.deleteTask.successId) {
      if (this.props.deleteTask) {
        if (this.props.deleteTask !== nextProps.deleteTask) {
          nextProps.showEpicTasks(epicId);
        }
      } else nextProps.showEpicTasks(epicId);
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

    if (nextProps.updateTask && epicId) {
      if (this.props.updateTask) {
        if (this.props.updateTask != nextProps.updateTask) {
          // nextProps.showEpicTasks(epicId);
          // nextProps.showAllEpics(nextProps.projectId);
        }
      } else {
        // nextProps.showEpicTasks(epicId);
        // nextProps.showAllEpics(nextProps.projectId);
      }
    }
  }

  toggleMyTasks = () => {
    this.setState({ myTasks: !this.state.myTasks });
  };

  renderProjectbBoard() {
    const { projectId, currentEpic, status } = this.props;

    return (
      <S_Board>
        <KanbanBoard
          currentProject={projectId}
          currentEpic={currentEpic}
          myTasks={this.state.myTasks}
          status={status}
        />
      </S_Board>
    );
  }

  renderProjectPage = () => {
    const {
      projectId,
      showAllEpics,
      currentEpic,
      projectWithId,
      history
    } = this.props;

    const { epics } = projectWithId || {};

    if (currentEpic !== "all") {
      return (
        <S_Board>
          <KanbanBoard
            currentProject={projectId}
            currentEpic={currentEpic}
            myTasks={this.state.myTasks}
          />
        </S_Board>
      );
    } else {
      return (
        <S_Board>
          <EditProject projectId={projectId} />
          <div className="moduleWrapper">
            {epics &&
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
              epics &&
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
    const { projectId, currentEpic, history } = this.props;

    return (
      <EditModule
        projectId={+projectId}
        currentEpic={+currentEpic}
        history={history}
      />
    );
  };

  renderContent = status => {
    switch (status) {
      case "view":
        return this.renderProjectbBoard();
      case "edit":
        return this.renderModulePage();
      default:
        return this.renderProjectPage();
    }
  };

  render() {
    const { projectId, currentEpic, status } = this.props;
    const { myTasks } = this.state;

    return (
      <ContainerLarge indentBot>
        <BoardSubHeader
          project={projectId}
          currentEpic={currentEpic}
          toggleMyTasks={this.toggleMyTasks}
          myTasks={myTasks}
          status={status}
        />

        {this.renderContent(status)}
      </ContainerLarge>
    );
  }
}

const mapStateToProps = state => {
  return {
    allEpics: state.allEpics,
    deleteEpic: state.deleteEpic,
    createEpic: state.createEpic,
    createTask: state.createTask,
    epicTasks: state.epicTasks,
    updateTask: state.updateTask,
    deleteTask: state.deleteTask,
    assignSpecialist: state.assignSpecialist,
    removeSpecialist: state.removeSpecialist,
    projectWithId: state.projectWithId
  };
};

export default connect(mapStateToProps, {
  showAllProjects,
  showAllEpics,
  showEpicTasks,
  showProjectTeam,
  showProjectWithId
})(ProjectsBoard);
