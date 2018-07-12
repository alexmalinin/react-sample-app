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
  removeSpecialistFromTask
} from "../../actions/actions";
import { S_REDGUY } from "../../constants/user";
import { getUserRole, difference } from "../../helpers/functions";
import { PORT } from "../../constants/constants";

class KanbanBoard extends PureComponent {
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

    if (nextProps.createTask) {
      if (this.props.createTask) {
        if (this.props.createTask !== nextProps.createTask) {
          this.loadTasks();
        }
      } else this.loadTasks();
    }
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
    this.props.deleteEpicTask(epic, +id, () =>
      this.kanbanEvent.publish({
        type: "REMOVE_CARD",
        laneId,
        cardId: id
      })
    );
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
      tasks,
      showEpic: { epic },
      specialists
    } = this.props;

    const { editingTask } = this.state;

    // const kanbanClass = ClassNames("kanban", {
    //   show: loaded,
    //   fade: loading
    // });

    // if (error)
    //   return <div className="noTasks">Something went wrong, pelase reload</div>;

    // if (!loaded && loading) return <div className="noTasks">Loading</div>;

    // if (loaded && !tasks.length)
    //   return <div className="noTasks">No tasks for now</div>;
    // else
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

const mapStateToProps = state => {
  return {
    // allEpics: state.allEpics,
    showEpic: state.showEpic,
    createTask: state.createTask
    // epicTasks: state.epicTasks
    // projectTeam: state.projectTeam
  };
};

export default withRouter(
  connect(mapStateToProps, {
    showEpicTasks,
    updateEpicTask,
    deleteEpicTask,
    showAllEpics,
    assignSpecialistToTask,
    removeSpecialistFromTask
  })(KanbanBoard)
);
