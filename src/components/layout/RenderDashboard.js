import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import moment from "moment";
import RenderCard from "./RenderCard";
import RenderDueTasks from "./dashboard/RenderDueTasks";
import RenderInfo from "./dashboard/RenderInfo";
import StyledDashBoard from "../../styleComponents/StyledDashBoard";
import {
  showAllProjects,
  showAllSpecialists,
  showSpecialistProjects,
  showAllEpicsWithoutProject,
  showAllEpicTasks
} from "../../actions/actions";
import { getUserRole } from "../../helpers/functions";
import { S_REDGUY, CUSTOMER } from "../../constans/constans";

class RenderDashboard extends Component {
  componentWillMount() {
    if (getUserRole() === CUSTOMER) {
      this.props.showAllSpecialists("red_guy");
    } else if (getUserRole() === S_REDGUY) {
      this.props.showAllSpecialists("active", "core");
    }

    if (this.props.changeUserType === "Client") {
      this.props.showAllProjects();
    }

    if (this.props.changeUserType === "Specialist") {
      this.props.showSpecialistProjects();
    }

    if (this.props.showAllEpicsWithoutProject) {
      this.props.showAllEpicsWithoutProject();
    }

    if (this.props.showAllEpicTasks) {
      this.props.showAllEpicTasks();
    }
  }

  getEtaForWeek(array = []) {
    const start = moment().startOf("day"),
      end = moment().endOf("week");
    let etaTasks = [];

    etaTasks = array
      ? array.filter(task => {
          return (
            moment(task.eta).isBetween(start, end) ||
            moment(task.eta).isSame(start)
          );
        })
      : null;

    return etaTasks.sort((a, b) => {
      return new Date(a.eta) - new Date(b.eta);
    });
  }

  assignProjectName = epics => {
    const { projects } = this.props;

    epics &&
      epics.forEach(epic => {
        let proj = null;

        projects
          ? (proj = projects.filter(p => p.id === epic.project_id))
          : null;

        epic["project_name"] =
          proj && proj.length > 0 ? proj[0].name : "Unnamed";
      });

    return epics;
  };

  render() {
    const { projects, allEpicsWithoutProject, allEpicTasks } = this.props;

    let overview;
    if (projects) {
      overview = {
        name: "Projects overview",
        subtitle: "Status",
        size: {
          col: 2,
          row: 2
        },
        projects: projects
      };
    }

    let allEpics = [],
      allTasks = [];

    projects &&
      projects.forEach(project => {
        let epics =
          (allEpicsWithoutProject &&
            allEpicsWithoutProject.filter(
              epic => epic.project_id === project.id
            )) ||
          [];
        allEpics.push(...epics);
      });

    allEpics &&
      allEpics.forEach(epic => {
        let tasks =
          (allEpicTasks &&
            allEpicTasks.filter(task => task.epic_id === epic.id)) ||
          [];
        allTasks.push(...tasks);
      });

    return projects && projects.length ? (
      <StyledDashBoard>
        <RenderDueTasks
          allEpicsWithoutProject={allEpics}
          allEpicTasks={allTasks}
          getEtaForWeek={this.getEtaForWeek}
          assignProjectName={this.assignProjectName}
        />

        <div className="projects">
          {projects && (
            <div>
              <RenderCard type="overview" data={overview} />

              {projects.map((project, key) => (
                <RenderCard type="project" key={key} data={project} />
              ))}
            </div>
          )}
        </div>

        <RenderInfo
          allEpicsWithoutProject={allEpics}
          allEpicTasks={allTasks}
          getEtaForWeek={this.getEtaForWeek}
          assignProjectName={this.assignProjectName}
        />
      </StyledDashBoard>
    ) : (
      <div className="default">There are no projects</div>
    );
  }
}

export default connect(
  ({
    changeUserType,
    allEpicsWithoutProject,
    allEpicTasks,
    changeUsertype
  }) => ({
    changeUserType,
    allEpicsWithoutProject,
    allEpicTasks,
    changeUsertype
  }),
  {
    showAllProjects,
    showAllSpecialists,
    showSpecialistProjects,
    showAllEpicsWithoutProject,
    showAllEpicTasks
  }
)(RenderDashboard);
