import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Board from "react-trello";
import Axios from "axios";

import CustomCard from "./CustomTaskCard";
import EditTaskModal from "@components/Task";

import { getProjectEpics } from "@ducks/epics/actions";
import { tasksOperations } from "@ducks/tasks";
import { isRedguy } from "@ducks/user/selectors";
import { PORT } from "@utilities";

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
      getProjectEpics,
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
        getProjectEpics(epic.project_id);
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
    const { tasks, specialists, isRedguy, user, epicId } = this.props;

    const { editingTask } = this.state;

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
          draggable={isRedguy}
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
            user={user}
          />
        </Board>
        <EditTaskModal
          ref={modal => (this.modal = modal)}
          close={this.closeModal}
          epicId={epicId}
          epicTask={editingTask}
          currentProjectTeam={specialists}
          assignSpecialist={this.assignSpecialist}
          removeSpecialist={this.removeSpecialist}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { user } = state;
  let { tasks } = state;
  const { myTasks, match } = props;

  if (myTasks) {
    tasks = tasks.filter(task =>
      task.specialists.some(spec => spec.id === user.id)
    );
  }

  return {
    user: user,
    isRedguy: isRedguy(user),
    tasks,
    epicId: state.epics.allIds[match.params.num - 1],
    deleteTask: state.deleteTask
  };
};

const mapDispatchToProps = {
  ...tasksOperations,
  getProjectEpics
};

export default connect(mapStateToProps, mapDispatchToProps)(KanbanBoard);
