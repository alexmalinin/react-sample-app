import React, { Component, PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Board from "react-trello";
import ClassNames from "classnames";
import Axios from "axios";

import CustomCard from "./CustomTaskCard";
import EditTaskModal from "../modals/EditTaskModal";

import {
  showEpicTasks,
  updateEpicTask,
  deleteEpicTask,
  showAllEpics,
  assignSpecialistToTask,
<<<<<<< cffb0315402d21ed6bd9ab6f9fccde4609ce3012
  removeSpecialistFromTask,
  showProjectEpic
} from "../../actions/actions";
import { S_REDGUY } from "../../constants/user";
import { getUserRole, difference, getUserId } from "../../helpers/functions";
=======
  removeSpecialistFromTask
} from "../../actions/actions";
import { S_REDGUY } from "../../constants/user";
import { getUserRole, difference } from "../../helpers/functions";
>>>>>>> [Refactor] JWT refactor to new api
import { PORT } from "../../constants/constants";

class KanbanBoard extends Component {
  state = {
    tasks: [],
    showBoard: false,
    editingTask: {},
    currentProjectTeam: [],
    editModal: false
  };

  handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    const {
      updateEpicTask,
      showEpicTasks,
<<<<<<< cffb0315402d21ed6bd9ab6f9fccde4609ce3012
      showAllEpics,
      showEpic: { epic }
    } = this.props;

    // updateEpicTask({ state: +targetLaneId }, epic.id, cardId);
    Axios({
      method: "PUT",
      url: `${PORT}/api/v1/epics/${epic.id}/tasks/${cardId}`,
      data: {
        task: { state: +targetLaneId }
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`
      }
    })
      .then(response => {
        showAllEpics(epic.project_id);
        this.loadTasks();
      })
      .catch(error => {
        console.error(error);
        this.loadTasks();
      });
=======
      showEpic: { epic }
    } = this.props;

    updateEpicTask({ state: +targetLaneId }, epic.id, cardId);
>>>>>>> [Refactor] JWT refactor to new api
  };

  assignSpecialist = (task, specialist) => {
    const { assignSpecialistToTask, epicId } = this.props;
    assignSpecialistToTask(epicId, +task, specialist);
  };

  removeSpecialist = (task, specialist) => {
    const { removeSpecialistFromTask, epicId } = this.props;
    removeSpecialistFromTask(epicId, +task, specialist);
  };

  componentWillReceiveProps(nextProps) {
    // console.log(difference(this.props, nextProps));
  }

  handleCardClick = id => {
    const { tasks } = this.props;

    if (id) {
      let editTask = tasks.find(task => task.id === +id);
      this.modal.open(editTask);
    }
  };

  closeModal = updated => {
    if (updated) {
      this.loadTasks();
    }
  };

  deleteTask = (epic, id, laneId) => {
    this.props.deleteEpicTask(epic, +id, this.loadTasks);
  };

  loadTasks = () => {
    //krunch
    const {
      match: {
        params: { moduleId }
      },
      showEpic: { epic },
      showEpicTasks
    } = this.props;
    showEpicTasks(epic.id);
  };

  render() {
    const {
<<<<<<< cffb0315402d21ed6bd9ab6f9fccde4609ce3012
      tasks,
=======
      epicTasks: { tasks, loading, loaded, error },
>>>>>>> [Refactor] JWT refactor to new api
      showEpic: { epic },
      specialists
    } = this.props;

    const { editingTask } = this.state;

<<<<<<< cffb0315402d21ed6bd9ab6f9fccde4609ce3012
    return (
      <Fragment>
        <Board
          data={{
            lanes: [
              {
                id: "0",
                title: "Backlog",
                cards: tasks.filter(task => task.state === "backlog")
              },
              {
                id: "1",
                title: "In progress",
                cards: tasks.filter(task => task.state === "in_progress")
              },
              {
                id: "2",
                title: "Done",
                cards: tasks.filter(task => task.state === "done")
              },
              {
                id: "3",
                title: "Accepted",
                cards: tasks.filter(task => task.state === "accepted")
              }
            ]
          }}
          eventBusHandle={handle => (this.kanbanEvent = handle)}
          // className={kanbanClass}
          className="kanban"
          draggable={getUserRole() === S_REDGUY}
          customCardLayout
          handleDragEnd={this.handleDragEnd}
          onCardClick={this.handleCardClick}
        >
          <CustomCard
            handleEditTask={this.handleCardClick}
            deleteTask={this.deleteTask}
            specialistList={specialists}
=======
    const kanbanClass = ClassNames("kanban", {
      show: loaded,
      fade: loading
    });

    if (error)
      return <div className="noTasks">Something went wrong, pelase reload</div>;

    if (!loaded && loading) return <div className="noTasks">Loading</div>;

    if (loaded && !tasks.length)
      return <div className="noTasks">No tasks for now</div>;
    else
      return (
        <Fragment>
          <Board
            data={{
              lanes: [
                {
                  id: "0",
                  title: "Backlog",
                  cards: tasks.filter(task => task.state === "backlog")
                },
                {
                  id: "1",
                  title: "In progress",
                  cards: tasks.filter(task => task.state === "in_progress")
                },
                {
                  id: "2",
                  title: "Done",
                  cards: tasks.filter(task => task.state === "done")
                },
                {
                  id: "3",
                  title: "Accepted",
                  cards: tasks.filter(task => task.state === "accepted")
                }
              ]
            }}
            eventBusHandle={handle => (this.kanbanEvent = handle)}
            className={kanbanClass}
            draggable={getUserRole() === S_REDGUY}
            customCardLayout
            handleDragEnd={this.handleDragEnd}
            onCardClick={this.handleCardClick}
          >
            <CustomCard
              handleEditTask={this.handleCardClick}
              deleteTask={this.deleteTask}
              specialistList={specialists}
              assignSpecialist={this.assignSpecialist}
              removeSpecialist={this.removeSpecialist}
            />
          </Board>
          <EditTaskModal
            ref={modal => (this.modal = modal)}
            close={this.closeModal}
            epic={epic}
            epicTask={editingTask}
            currentProjectTeam={specialists}
>>>>>>> [Refactor] JWT refactor to new api
            assignSpecialist={this.assignSpecialist}
            removeSpecialist={this.removeSpecialist}
          />
        </Board>
        <EditTaskModal
          ref={modal => (this.modal = modal)}
          close={this.closeModal}
          epic={epic}
          epicTask={editingTask}
          currentProjectTeam={specialists}
          assignSpecialist={this.assignSpecialist}
          removeSpecialist={this.removeSpecialist}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state, { tasks, myTasks }) => {
  if (myTasks) {
    tasks = tasks.filter(task =>
      task.specialists.some(spec => spec.id === getUserId())
    );
  }
  return {
<<<<<<< cffb0315402d21ed6bd9ab6f9fccde4609ce3012
    tasks,
    showEpic: state.showEpic,
    deleteTask: state.deleteTask
=======
    // allEpics: state.allEpics,
    showEpic: state.showEpic,
    createTask: state.createTask,
    epicTasks: state.epicTasks
    // projectTeam: state.projectTeam
>>>>>>> [Refactor] JWT refactor to new api
  };
};

export default withRouter(
  connect(mapStateToProps, {
    showProjectEpic,
    showEpicTasks,
    updateEpicTask,
    deleteEpicTask,
    showAllEpics,
    assignSpecialistToTask,
    removeSpecialistFromTask
  })(KanbanBoard)
);
