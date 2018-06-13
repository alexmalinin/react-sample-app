import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Board from "react-trello";
import CustomCard from "./CustomTaskCard";
import { Transition } from "semantic-ui-react";
import {
  showEpicTasks,
  updateEpicTask,
  deleteEpicTask,
  assignSpecialistToTask,
  removeSpecialistFromTask
} from "../../actions/actions";
import { S_REDGUY } from "../../constans/constans";
import {
  getUserRole,
  getUserId,
  getCookie,
  setCookie
} from "../../helpers/functions";
import EditTaskModal from "../modals/EditTaskModal";

class KanbanBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backlogTasks: [],
      progressTasks: [],
      completedTasks: [],
      acceptedTasks: [],
      showBoard: false,
      editingTask: {},
      currentProjectTeam: [],
      editModal: false
    };
  }

  handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    this.props.updateEpicTask(
      { state: +targetLaneId },
      this.props.epicId,
      cardId
    );
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
    //TODO request a specialists list from back on dropdown open
    if (nextProps.projectTeam) {
      if (nextProps.projectTeam.project_id === +nextProps.currentProject) {
        this.setState({
          currentProjectTeam: nextProps.projectTeam.specialists
        });
      } else this.setState({ currentProjectTeam: [] });
    }

    if (this.props.currentEpic !== nextProps.currentEpic) {
      this.setState({
        showBoard: false
      });
    }

    if (
      nextProps.epicTasks &&
      nextProps.projectTeam &&
      nextProps.currentEpic !== "all"
    ) {
      if (
        this.props.epicTasks !== nextProps.epicTasks ||
        nextProps.allSpecialists ||
        nextProps.myTasks !== this.props.myTasks
      ) {
        let backlog = [],
          completed = [],
          progress = [],
          accepted = [],
          taskList = [];

        if (nextProps.myTasks) {
          taskList = nextProps.epicTasks.filter(task =>
            task.specialist_tasks.some(
              ({ specialist }) => specialist.id === getUserId()
            )
          );
        } else taskList = nextProps.epicTasks;

        taskList.forEach(task => {
          const taskObject = {
            id: `${task.id}`,
            assignSpecialist: this.assignSpecialist,
            removeSpecialist: this.removeSpecialist,
            title: task.name,
            eta: task.eta,
            cost: task.cost,
            description: "Platform - Dashboard",
            specialists: task.specialists
          };
          if (task.state === "backlog") {
            backlog.push(taskObject);
          }
          if (task.state === "in_progress") {
            progress.push(taskObject);
          }
          if (task.state === "done") {
            completed.push(taskObject);
          }
          if (task.state === "accepted") {
            accepted.push(taskObject);
          }
        });
        this.setState({
          backlogTasks: backlog,
          progressTasks: progress,
          completedTasks: completed,
          acceptedTasks: accepted,
          showBoard: true
        });
      }
    } else {
      this.setState({
        showBoard: false
      });
    }
  }

  handleEditTask = id => {
    const { epicTasks } = this.props;

    if (id && epicTasks) {
      let epicTask = epicTasks.find(task => task.id === Number(id));
      this.setState({ editingTask: epicTask, editModal: true });
    }
  };

  closeModal = updated => {
    if (updated) {
      this.props.showEpicTasks(this.props.epicId);
    }
    this.setState({ editModal: false });
  };

  deleteTask = (epic, id) => {
    const { deleteEpicTask } = this.props;
    deleteEpicTask(epic, Number(id));
  };

  render() {
    const { changeUserType, currentEpic, epicId, epicTasks } = this.props;
    const {
      backlogTasks,
      progressTasks,
      completedTasks,
      acceptedTasks,
      editingTask,
      editModal
    } = this.state;

    return (
      currentEpic !== "all" &&
      (backlogTasks.length !== 0 ||
      progressTasks.length !== 0 ||
      completedTasks.length !== 0 ||
      acceptedTasks.length !== 0 ? (
        <Fragment>
          <Board
            data={{
              lanes: [
                { id: "0", title: "Backlog", cards: backlogTasks },
                { id: "1", title: "In progress", cards: progressTasks },
                { id: "2", title: "Done", cards: completedTasks },
                { id: "3", title: "Accepted", cards: acceptedTasks }
              ]
            }}
            className={`kanban${
              epicId !== epicTasks.epicId ? " fade" : " show"
            }`}
            draggable={getUserRole() === S_REDGUY}
            customCardLayout
            handleDragEnd={this.handleDragEnd}
            onCardClick={this.handleEditTask}
          >
            <CustomCard
              userType={changeUserType}
              epic={epicId}
              handleEditTask={this.handleEditTask}
              deleteTask={this.deleteTask}
              specialistList={this.state.currentProjectTeam}
            />
          </Board>
          <EditTaskModal
            open={editModal}
            close={this.closeModal}
            epic={epicId}
            epicTask={editingTask}
            assignSpecialist={this.assignSpecialist}
            removeSpecialist={this.removeSpecialist}
          />
        </Fragment>
      ) : (
        <div className="noTasks">No tasks for now</div>
      ))
    );
  }
}

export default connect(
  ({ epicTasks, allSpecialists, changeUserType, projectTeam }) => ({
    epicTasks,
    allSpecialists,
    changeUserType,
    projectTeam
  }),
  {
    showEpicTasks,
    updateEpicTask,
    deleteEpicTask,
    assignSpecialistToTask,
    removeSpecialistFromTask
  }
)(KanbanBoard);
