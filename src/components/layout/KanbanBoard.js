import React, { Component } from "react";
import { connect } from "react-redux";
import Board from "react-trello";
import CustomCard from "./CustomTaskCard";
import { Transition } from "semantic-ui-react";

import {
  updateEpicTask,
  assignSpecialistToTask,
  removeSpecialistFromTask
} from "../../actions/actions";
import { S_REDGUY } from "../../constans/constans";
import { getUserRole } from "../../helpers/functions";

class KanbanBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backlogTasks: [],
      progressTasks: [],
      completedTasks: [],
      showBoard: false
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
        nextProps.allSpecialists
      ) {
        let backlog = [],
          completed = [],
          progress = [],
          accepted = [];
        nextProps.epicTasks.forEach(task => {
          const taskObject = {
            id: `${task.id}`,
            assignSpecialist: this.assignSpecialist,
            removeSpecialist: this.removeSpecialist,
            title: task.name,
            description: "Platform - Dashboard",
            specialists: task.specialists,
            specialistList: nextProps.projectTeam[0].specialists
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

  render() {
    const { changeUserType, currentEpic, epicId, epicTasks } = this.props;
    const {
      backlogTasks,
      progressTasks,
      completedTasks,
      acceptedTasks,
      showBoard
    } = this.state;

    return (
      // <Transition animation="fade" duration={400} visible={showBoard}>
      //   {backlogTasks.length !== 0 ||
      //   progressTasks.length !== 0 ||
      //   completedTasks.length !== 0 ? (
      //     <Board
      //       data={{
      //         lanes: [
      //           { id: "0", title: "Backlog", cards: backlogTasks },
      //           { id: "1", title: "In progress", cards: progressTasks },
      //           { id: "2", title: "Done", cards: completedTasks },
      //           { id: "3", title: "Accepted", cards: acceptedTasks }
      //         ]
      //       }}
      //       className="kanban"
      //       draggable={getUserRole() === S_REDGUY}
      //       customCardLayout
      //       handleDragEnd={this.handleDragEnd}
      //     >
      //       <CustomCard userType={changeUserType} />
      //     </Board>
      //   ) : (
      //     <div className="noTasks">No tasks for now</div>
      //   )}
      // </Transition>
      showBoard &&
      (backlogTasks.length !== 0 ||
      progressTasks.length !== 0 ||
      completedTasks.length !== 0 ? (
        <Board
          data={{
            lanes: [
              { id: "0", title: "Backlog", cards: backlogTasks },
              { id: "1", title: "In progress", cards: progressTasks },
              { id: "2", title: "Done", cards: completedTasks },
              { id: "3", title: "Accepted", cards: acceptedTasks }
            ]
          }}
          className={`kanban${epicId !== epicTasks.epicId ? " fade" : " show"}`}
          draggable={getUserRole() === S_REDGUY}
          customCardLayout
          handleDragEnd={this.handleDragEnd}
        >
          <CustomCard userType={changeUserType} />
        </Board>
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
  { updateEpicTask, assignSpecialistToTask, removeSpecialistFromTask }
)(KanbanBoard);
