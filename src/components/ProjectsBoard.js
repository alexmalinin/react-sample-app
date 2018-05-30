import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { ContainerLarge } from "../styleComponents/layout/Container";
import {
  showAllProjects,
  showAllEpics,
  deleteProjectEpic,
  updateProjectEpic,
  createEpicTask,
  showEpicTasks,
  updateEpicTask,
  showAllSpecialists,
  showProjectTeam,
  updateCreatedProject
} from "../actions/actions";
import { SubmissionError } from "redux-form";
import { CLIENT, SPECIALIST, S_REDGUY, PORT } from "../constans/constans";
import { S_Board } from "../styleComponents/S_Board";
import BoardSubHeader from "./layout/BoardSubHeader";
import ModuleCard from "./layout/ModuleCard";
import KanbanBoard from "./layout/KanbanBoard";
import { getUserRole, getUserType } from "../helpers/functions";
import EditProjectForm from "./forms/EditProjectForm";
import Axios from "axios";
import { S_Message } from "../styleComponents/layout/S_Message";
import { Message } from "semantic-ui-react";

class ProjectsBoard extends Component {
  state = {
    fetchEpicTasks: true,
    renderMessage: false,
    renderErrorMessage: false
  };

  componentWillMount() {
    this.props.showAllProjects();
    this.props.showAllEpics(this.props.projectId);
    this.props.showProjectTeam(this.props.projectId);
  }

  componentWillReceiveProps(nextProps) {
    let epicId;
    if (
      nextProps.allEpics &&
      nextProps.currentEpic !== "all" &&
      nextProps.projectWithId
    ) {
      if (+nextProps.currentEpic > nextProps.allEpics.length) {
        epicId = nextProps.allEpics[nextProps.allEpics.length - 1].id;
        nextProps.history.push(
          `/dashboard/project/${nextProps.projectWithId.id}/module/all`
        );
      } else epicId = nextProps.allEpics[nextProps.currentEpic - 1].id;
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
      if (this.props.epicTasks) {
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
          nextProps.showEpicTasks(epicId);
          nextProps.showAllEpics(nextProps.projectId);
        }
      } else {
        nextProps.showEpicTasks(epicId);
        nextProps.showAllEpics(nextProps.projectId);
      }
    }
  }

  renderContent = () => {
    const {
      projectId,
      allEpics,
      showAllEpics,
      updateProjectEpic,
      currentEpic
    } = this.props;

    const epicId =
      allEpics && currentEpic !== "all" && +currentEpic <= allEpics.length
        ? allEpics[currentEpic - 1].id
        : null;

    if (currentEpic !== "all") {
      return (
        <S_Board>
          <KanbanBoard
            currentProject={projectId}
            currentEpic={currentEpic}
            epicId={epicId}
          />

          <div className="moduleWrapper">
            {allEpics &&
              allEpics.map((epic, key) => (
                <ModuleCard
                  epic={epic}
                  key={key}
                  number={key + 1}
                  project={projectId}
                  updateEpicList={showAllEpics}
                  updateProjectEpic={updateProjectEpic}
                />
              ))}
            {(getUserType() === CLIENT || getUserRole() === S_REDGUY) && (
              <div className="dragContainer addModuleContainer">
                <h3>&nbsp;</h3>
                <div className="module addModule">
                  <NavLink
                    to={`/dashboard/project/${projectId}/module/new`}
                    className="addButt"
                  >
                    <span className="plus">+</span>
                    <span className="add">Add module</span>
                  </NavLink>
                </div>
              </div>
            )}
            {getUserType() === SPECIALIST &&
              allEpics &&
              allEpics.length === 0 && (
                <div className="noModules">
                  <p>No modules yet</p>
                </div>
              )}
          </div>
        </S_Board>
      );
    } else {
      return <EditProjectForm onSubmit={this.submit} projectId={projectId} />;
    }
  };

  submit = values => {
    values.project_id = this.props.projectId;
    // this.props.updateCreatedProject(values);
    return Axios({
      method: "PUT",
      url: `${PORT}/api/v1/projects/${this.props.projectId}`,
      data: {
        project: {
          name: values["name"],
          description: values["description"],
          user_story: values["user_story"],
          business_requirements: values["business_requirements"],
          business_rules: values["business_rules"],
          deliverables: values["acceptance_criteria"],
          further_notes: values["solution_design"]
          // attached_files_attributes: files,
        }
      }
    })
      .then(response => {
        this.setState({ renderMessage: true });
        setTimeout(() => {
          this.setState({ renderMessage: false, renderErrorMessage: false });
        }, 2500);
      })
      .catch(error => {
        this.setState({ renderErrorMessage: true });
        setTimeout(() => {
          this.setState({ renderMessage: false, renderErrorMessage: false });
        }, 2500);
        throw new SubmissionError({ _error: "Updating project failed" });
      });
  };

  render() {
    const { projectId, allEpics, currentEpic, epicTasks } = this.props;
    const { renderMessage, renderErrorMessage } = this.state;

    const epicId =
      allEpics && currentEpic !== "all" && +currentEpic <= allEpics.length
        ? allEpics[currentEpic - 1].id
        : null;

    return (
      <ContainerLarge indentBot>
        <BoardSubHeader
          project={projectId}
          currentEpic={currentEpic}
          epicId={epicId}
          epicTasks={epicTasks}
        />
        {this.renderContent()}
        <S_Message positive profile="true" data-show={renderMessage}>
          <Message.Header>Success!</Message.Header>
          <p>Project updated</p>
        </S_Message>
        <S_Message negative profile="true" data-show={renderErrorMessage}>
          <Message.Header>Error!</Message.Header>
          <p>Something went wrong, please try again</p>
        </S_Message>
      </ContainerLarge>
    );
  }
}

export default connect(
  ({
    allProjects,
    allEpics,
    deleteEpic,
    createEpic,
    createTask,
    epicTasks,
    updateTask,
    deleteTask,
    allSpecialists,
    assignSpecialist,
    removeSpecialist,
    projectWithId
  }) => ({
    allProjects,
    allEpics,
    deleteEpic,
    createEpic,
    createTask,
    epicTasks,
    updateTask,
    deleteTask,
    allSpecialists,
    assignSpecialist,
    removeSpecialist,
    projectWithId
  }),
  {
    showAllProjects,
    showAllEpics,
    deleteProjectEpic,
    updateProjectEpic,
    createEpicTask,
    showEpicTasks,
    updateEpicTask,
    showAllSpecialists,
    showProjectTeam,
    updateCreatedProject
  }
)(ProjectsBoard);
