import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import ProgressBars from "../ProgressBar";
import AssignDropdown from "../AssignDropdown";
import PersonTile from "../PersonTile";
import SubHeaderLinkWrap from "../../forms/renders/SubHeaderLinkWrap";
import StyledDashboardCard from "../../../styleComponents/StyledDashboardCard";
import {
  IMAGE_PORT,
  CLIENT,
  S_REDGUY,
  CUSTOMER
} from "../../../constans/constans";
import { getUserRole } from "../../../helpers/functions";
import { showProjectTeam } from "../../../actions/actions";

class RenderProjectCard extends Component {
  state = {
    completed_modules: null,
    completed_tasks: null,
    all_tasks: null,
    all_modules: null
  };

  componentWillMount() {
    const {
      showProjectTeam,
      data: { id }
    } = this.props;

    showProjectTeam(id);
  }

  getSummary = ({
    completed_modules,
    completed_tasks,
    all_tasks,
    all_modules
  }) => {
    this.setState({
      completed_modules,
      completed_tasks,
      all_tasks,
      all_modules
    });
  };

  componentWillReceiveProps(nextProps) {
    const {
      data: { id },
      projectTeam
    } = nextProps;

    if (projectTeam) {
      if (projectTeam[0]) {
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
    }
  }

  renderProjectProgress = () => {
    const {
      data: { id },
      summary
    } = this.props;

    let allModules = (summary && summary.all_modules) || 0,
      completedModules = (summary && summary.completed_modules) || 0,
      allTasks = (summary && summary.all_tasks) || 0,
      completedTasks = (summary && summary.completed_tasks) || 0,
      modulesPercent = Math.round(completedModules / allModules * 100) || 0,
      tasksPercent = Math.round(completedTasks / allTasks * 100) || 0;

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
          <div className="progressBar">{allModules}</div>
          <ProgressBars percents={modulesPercent} strokeColor="#4d4d4d" />
          <span>Modules</span>
        </div>
        <div className="progressItem">
          <div className="progressBar">{allTasks}</div>
          <ProgressBars percents={tasksPercent} strokeColor="#4d4d4d" />
          <span>Epics</span>
        </div>
        <div className="progressItem">
          <div className="progressBar">0%</div>
          <ProgressBars percents={0} strokeColor="#4d4d4d" />
          <span>Project progress</span>
        </div>
      </div>
    );
  };

  render() {
    const {
      changeUserType,
      data: { id, epics, name, logo },
      getCurrentEpic
    } = this.props;

    const { projectTeam } = this.state;

    let currentEpic = epics && getCurrentEpic(epics);

    return (
      <StyledDashboardCard size={{ col: 2, row: 2 }} type="project">
        <div className="titleWrapper">
          {logo && logo.url ? (
            <img src={IMAGE_PORT + logo.url} alt={name} />
          ) : (
            <span className="projectNoLogo">{name[0]}</span>
          )}
          <div>
            <div className="title">{name}</div>
            <div className="subTitle">
              {currentEpic && currentEpic.name
                ? `Module: ${currentEpic.name}`
                : null}
            </div>
          </div>
        </div>

        <div className="projectContainer project">
          <div className="team">
            {projectTeam &&
              projectTeam.specialists && (
                <ProjectTeam
                  specialists={projectTeam.specialists}
                  changeUserType={changeUserType}
                />
              )}
          </div>

          {this.renderProjectProgress()}
        </div>
      </StyledDashboardCard>
    );
  }
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
    const { changeUserType } = this.props;
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
              userType={changeUserType}
              hideDelete={true}
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
  ({ projectTeam, allSpecialists, changeUserType }) => ({
    projectTeam,
    allSpecialists,
    changeUserType
  }),
  {
    showProjectTeam
  }
)(RenderProjectCard);
