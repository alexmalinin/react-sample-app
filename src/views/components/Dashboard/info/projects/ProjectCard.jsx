import React, { Component } from "react";
import { connect } from "react-redux";

import ProgressBar from "@UI/ProgressBar";
import SubHeaderLinkWrap from "@UI/SubHeaderLink";
import StyledDashboardCard from "../StyledDashboardCard";
// import { getUserRole } from "../../../helpers/functions";
// import { showProjectTeam } from "../../../actions/actions";
import MembersDropdown from "@UI/MembersDropdown";
import { IMAGE_PORT, S_REDGUY, CUSTOMER } from "@utilities";

class ProjectCard extends Component {
  componentWillMount() {
    const {
      showProjectTeam,
      data: { id }
    } = this.props;

    // showProjectTeam(id);
  }

  // componentWillReceiveProps(nextProps) {
  //   const {
  //     data: { id },
  //     projectTeam
  //   } = nextProps;

  //   if (projectTeam) {
  //     if (projectTeam.project_id === id) {
  //       if (this.props.projectTeam) {
  //         if (this.props.projectTeam !== projectTeam) {
  //           this.setState({
  //             projectTeam: projectTeam
  //           });
  //         }
  //       } else
  //         this.setState({
  //           projectTeam: projectTeam
  //         });
  //     }
  //   }
  // }

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
        {/* {getUserRole() === CUSTOMER || getUserRole() === S_REDGUY ? (
          <SubHeaderLinkWrap
            className="progressItem addModule"
            label="Add module"
            url={`/dashboard/project/${id}/module/new`}
          />
        ) : (
          <div>&nbsp;&nbsp;&nbsp;</div>
        )} */}
        <div className="progressItem">
          <div className="progressBar">{allModules}</div>
          <ProgressBar percents={modulesPercent} strokeColor="#4d4d4d" />
          <span>Modules</span>
        </div>
        <div className="progressItem">
          <div className="progressBar">{allTasks}</div>
          <ProgressBar percents={tasksPercent} strokeColor="#4d4d4d" />
          <span>Epics</span>
        </div>
        <div className="progressItem">
          <div className="progressBar">0%</div>
          <ProgressBar percents={0} strokeColor="#4d4d4d" />
          <span>Project progress</span>
        </div>
      </div>
    );
  };

  render() {
    const {
      data: { epics, name, logo },
      getCurrentEpic
    } = this.props;

    // const { projectTeam } = this.state;

    // let currentEpic = epics && getCurrentEpic(epics);

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
              {/* {currentEpic && currentEpic.name
                ? `Module: ${currentEpic.name}`
                : null} */}
            </div>
          </div>
        </div>

        <div className="projectContainer project">
          <div className="team">
            {/* {projectTeam &&
              projectTeam.specialists && (
                <MembersDropdown
                  members={projectTeam.specialists}
                  countToShow={3}
                  position="bottom left"
                  removeText="project"
                  hideDelete
                />
              )} */}
          </div>

          {this.renderProjectProgress()}
        </div>
      </StyledDashboardCard>
    );
  }
}

export default connect(
  ({ projectTeam, allSpecialists }) => ({
    projectTeam,
    allSpecialists
  }),
  {
    // showProjectTeam
  }
)(ProjectCard);
