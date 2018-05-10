import React, { Component } from "react";
import { connect } from "react-redux";

import ProgressBars from "./ProgressBar";
import { AssignDropdown, PersonTile } from "./AssignDropdown";
import SubHeaderLinkWrap from "../forms/renders/SubHeaderLinkWrap";
import StyledDashboardCard from "../../styleComponents/StyledDashboardCard";

import {
  showProjectTeam,
  assignSpecialistToTeam,
  removeSpecialistFromTeam
} from "../../actions/actions";
import { IMAGE_PORT, CLIENT, SPECIALIST } from "../../constans/constans";

class RenderCard extends Component {
  state = {};

  componentWillMount() {
    const {
      showProjectTeam,
      type,
      data: { id }
    } = this.props;

    if (type === "project") {
      showProjectTeam(id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      type,
      data: { id },
      projectTeam,
      assignToTeam
    } = nextProps;

    //TODO: type of cards as different components
    if (type === "project") {
      if (projectTeam) {
        if (projectTeam[0].project_id === id) {
          if (this.props.projectTeam) {
            if (this.props.projectTeam !== projectTeam) {
              this.setState({
                projectTeam: projectTeam[0]
              });
            }
          } else
            this.setState({
              projectTeam: projectTeam[0]
            });
        }
      }

      if (nextProps.assignToTeam) {
        if (nextProps.assignToTeam.project_id === id) {
          if (this.props.assignToTeam) {
            if (this.props.assignToTeam !== nextProps.assignToTeam) {
              nextProps.showProjectTeam(id);
            }
          } else nextProps.showProjectTeam(id);
        }
      }

      if (nextProps.removeFromTeam) {
        if (nextProps.removeFromTeam.project_id === id) {
          if (this.props.removeFromTeam) {
            if (this.props.removeFromTeam !== nextProps.removeFromTeam) {
              nextProps.showProjectTeam(id);
            }
          } else nextProps.showProjectTeam(id);
        }
      }
    }
  }

  handleAssign = (type, specId) => {
    const {
      assignSpecialistToTeam,
      removeSpecialistFromTeam,
      data: { id, team }
    } = this.props;

    if (type === "assign") {
      assignSpecialistToTeam(id, team.id, specId);
    } else removeSpecialistFromTeam(id, team.id, specId);
  };

  render() {
    const {
      type,
      village,
      allSpecialists,
      changeUserType,
      data: {
        name,
        epics,
        team,
        projects,
        logo,
        //from mockup
        title,
        content,
        days,
        progress,
        subtitle
      }
    } = this.props;

    const { projectTeam } = this.state;

    let size, subtitleColor;

    switch (type) {
      case "project":
        size = {
          col: 2,
          row: 2
        };
        break;
      default:
        size = this.props.data.size;
        break;
    }

    return (
      <StyledDashboardCard size={size} type={type} village={village}>
        <div className="titleWrapper">
          {type === "project" &&
            (logo.url ? (
              <img src={IMAGE_PORT + logo.url} alt={name} />
            ) : (
              <span className="projectNoLogo">{name[0]}</span>
            ))}
          <div>
            <p className="title">{title || name}</p>
            {type !== "tasks" &&
              type !== "tasks_due" && (
                <p className="subTitle">
                  {subtitle ? subtitle : `Module ${epics.length}`}
                </p>
              )}
          </div>
        </div>
        {days && (
          <div className="days">
            {days.map((item, index) => <RenderDays days={item} key={index} />)}
          </div>
        )}

        <div className="content">
          {content &&
            content.map((item, index) => (
              <div key={index}>
                <p>{item.count}</p>
                <p>{item.description}</p>
              </div>
            ))}
          {type === "overview" &&
            projects.map((project, key) => (
              <div key={key}>
                <p>{project.name}</p>
                <progress value={(key + 1) * 20} max="100" />
              </div>
            ))}
        </div>

        <div className={`projectContainer ${type}`}>
          <div className="team">
            {projectTeam &&
              projectTeam.specialists &&
              projectTeam.specialists.map((specialist, key) => (
                <PersonTile
                  key={key}
                  specialist={specialist}
                  handleRemove={this.handleAssign}
                  userType={changeUserType}
                  removeTitle="team"
                />
              ))}
            {projectTeam && (
              <AssignDropdown
                specialists={projectTeam.specialists}
                allSpecialists={allSpecialists}
                userType={changeUserType}
                handleAssign={this.handleAssign}
                closeOnChange={true}
              />
            )}
          </div>

          {type === "project" && <div />}
          {type === "project" && this.renderProjectProgress()}

          {progress && (
            <div className="progress">
              {progress.map((item, key) => (
                <div className="progressItem" key={key}>
                  <p className="progressCount">{item.count}</p>
                  <p className="progressDescription">{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </StyledDashboardCard>
    );
  }

  //TODO: type of cards as different components

  renderProjectProgress = () => {
    const {
      data: { id, epics },
      changeUserType
    } = this.props;

    let completedTasksCount = 0;
    epics &&
      epics.forEach(epic => epic.state === "done" && completedTasksCount++);
    const percents = Math.round(completedTasksCount / epics.length * 100) || 0;

    return (
      <div className="progress">
        {changeUserType === CLIENT ? (
          <SubHeaderLinkWrap
            className="progressItem addModule"
            url={`/dashboard/project/${id}/module/new`}
          >
            <span className="progressDescription">Add module</span>
          </SubHeaderLinkWrap>
        ) : (
          <div>&nbsp;&nbsp;&nbsp;</div>
        )}
        <div className="progressItem">
          <p className="progressCount">0/{epics.length}</p>
          <p className="progressDescription">Modules</p>
        </div>
        <div className="progressItem">
          <p className="progressCount">50/70</p>
          <p className="progressDescription">Tasks</p>
        </div>
        <div className="progressItem">
          <ProgressBars percents={25} />
          <p className="progressCount">75%</p>
          <p className="progressDescription">Project progress</p>
        </div>
      </div>
    );
  };
}

const RenderDays = ({ days }) => {
  return (
    <div className="day">
      <p className="dayTitle">{days.day}</p>
      <div className="tasksContainer">
        {days.data.map((item, index) => {
          return <RenderDayTasks day={item} key={index} />;
        })}
      </div>
    </div>
  );
};

const RenderDayTasks = ({ day }) => {
  return <p className="taskDescription">{day}</p>;
};

export default connect(
  ({
    projectTeam,
    allSpecialists,
    assignToTeam,
    removeFromTeam,
    changeUserType
  }) => ({
    projectTeam,
    allSpecialists,
    assignToTeam,
    removeFromTeam,
    changeUserType
  }),
  { showProjectTeam, assignSpecialistToTeam, removeSpecialistFromTeam }
)(RenderCard);
