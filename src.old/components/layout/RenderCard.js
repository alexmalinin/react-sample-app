import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import moment from "moment";
import ProgressBars from "./ProgressBar";
import AssignDropdown from "./AssignDropdown";
import PersonTile from "./PersonTile";
import SubHeaderLinkWrap from "../forms/renders/SubHeaderLinkWrap";
import StyledDashboardCard from "../../styleComponents/StyledDashboardCard";

import {
  showProjectTeam,
  assignSpecialistToTeam,
  removeSpecialistFromTeam
} from "../../actions/actions";
import { IMAGE_PORT } from "../../constants/constants";
import { S_REDGUY, CUSTOMER } from "../../constants/user";
import { getUserRole } from "../../helpers/functions";

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
      projectTeam
    } = nextProps;

    //TODO: type of cards as different components
    if (type === "project") {
      if (projectTeam) {
        if (projectTeam.project_id === id) {
          if (this.props.projectTeam) {
            if (this.props.projectTeam !== projectTeam) {
              this.setState({
                projectTeam: projectTeam
              });
            }
          } else
            this.setState({
              projectTeam: projectTeam
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

    console.log("assign", id, team);

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

    let size;

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

    let currentEpic = this.getCurrentEpic(epics);

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
            <div className="title">{title || name}</div>
            {type !== "tasks" &&
              type !== "tasks_due" && (
                <div className="subTitle">
                  {subtitle ? subtitle : currentEpic ? currentEpic.name : null}
                </div>
              )}
          </div>
        </div>
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
              projectTeam.specialists && (
                <ProjectTeam
                  specialists={projectTeam.specialists}
                  changeUserType={changeUserType}
                  handleAssign={this.handleAssign}
                />
              )}
            {projectTeam && (
              <AssignDropdown
                specialists={projectTeam.specialists}
                allSpecialists={allSpecialists}
                userType={[S_REDGUY, CUSTOMER]}
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

  getCurrentEpic(epics) {
    let start = moment().startOf("day"),
      etaEpics = [];

    etaEpics = epics
      ? epics.filter(task => {
          return (
            moment(task.eta).isSame(start) || moment(task.eta).isAfter(start)
          );
        })
      : null;

    if (etaEpics) {
      let curentEpics = etaEpics.sort((a, b) => {
        return new Date(a.eta) - new Date(b.eta);
      });

      return curentEpics[0];
    }
  }

  //TODO: type of cards as different components

  renderProjectProgress = () => {
    const {
      data: { id, epics }
    } = this.props;

    // console.log(epics);

    let completedTasksCount = 0;
    epics &&
      epics.forEach(epic => epic.state === "done" && completedTasksCount++);
    // const percents = Math.round(completedTasksCount / epics.length * 100) || 0;

    return (
      <div className="progress">
        {getUserRole() === CUSTOMER || getUserRole() === S_REDGUY ? (
          <SubHeaderLinkWrap
            className="progressItem addModule"
            label="Add module"
            url={`/dashboard/project/${id}/module/new`}
          />
        ) : (
          <div>&nbsp;&nbsp;&nbsp;</div>
        )}
        <div className="progressItem">
          <p className="progressCount">0/{epics.length}</p>
          <p className="progressDescription">Modules</p>
        </div>
        <div className="progressItem">
          <p className="progressCount">50/70</p>
          <p className="progressDescription">Epics</p>
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

class ProjectTeam extends Component {
  state = {
    specialists: this.props.specialists.slice(0, 3),
    pos: 0
  };

  prevSpec = () => {
    this.setState({
      pos: this.state.pos - 1
    });
  };

  nextSpec = () => {
    this.setState({
      pos: this.state.pos + 1
    });
  };

  render() {
    const { changeUserType, handleAssign } = this.props;
    const { pos } = this.state;
    const hidden = this.props.specialists.length > 3 ? "" : " hidden";

    return (
      <Fragment>
        <button
          disabled={pos === 0}
          className={`prev ${hidden}`}
          onClick={this.prevSpec}
        >
          <i className="fa fa-chevron-left" />
        </button>
        {this.props.specialists
          .slice(pos, pos + 3)
          .map((specialist, key) => (
            <PersonTile
              key={key}
              specialist={specialist}
              handleRemove={handleAssign}
              userType={changeUserType}
              removeTitle="team"
            />
          ))}
        <button
          disabled={pos === this.props.specialists.length - 3}
          className={`next ${hidden}`}
          onClick={this.nextSpec}
        >
          <i className="fa fa-chevron-right" />
        </button>
      </Fragment>
    );
  }
}

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
  {
    showProjectTeam,
    assignSpecialistToTeam,
    removeSpecialistFromTeam
  }
)(RenderCard);
