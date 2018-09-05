import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import moment from "moment";
import RenderProjectCards from "./dashboard/RenderProjectCards";
import RenderDueTasks from "./dashboard/RenderDueTasks";
import RenderInfo from "./dashboard/RenderInfo";
import StyledDashBoard from "../../styleComponents/StyledDashBoard";
// import {
//   showAllProjects,
//   showAllSpecialists,
//   showSpecialistProjects,
//   showAllEpicTasks
// } from "../../actions/actions";
import { getUserRole, getUserType } from "view/utils/functions";
import {
  PORT,
  S_REDGUY,
  CUSTOMER,
  CLIENT,
  SPECIALIST
} from "utilities/constants";

class RenderDashboard extends Component {
  state = {
    fetchSummary: true,
    summary: null
  };

  componentWillMount() {
    if (getUserRole() === CUSTOMER) {
      this.props.showAllSpecialists("red_guy");
    } else if (getUserRole() === S_REDGUY) {
      this.props.showAllSpecialists("active", "core");
    }

    if (getUserType() === CLIENT) {
      this.props.showAllProjects();
    }

    if (getUserType() === SPECIALIST) {
      this.props.showSpecialistProjects();
    }

    if (this.props.showAllEpicTasks) {
      this.props.showAllEpicTasks();
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.clientData && this.state.fetchSummary) {
      this.getSummaryInfo(nextProps.clientData.id);
      this.setState({ fetchSummary: false });
    }

    if (nextProps.specialistData && this.state.fetchSummary) {
      this.getSummaryInfo(nextProps.specialistData.id);
      this.setState({ fetchSummary: false });
    }
  }

  getSummaryInfo = async id => {
    let user = null;

    if (getUserRole() === CUSTOMER) {
      user = "customers";
    } else {
      user = "specialists";
    }

    await axios({
      method: "GET",
      url: `${PORT}/api/v1/${user}/${id}/dashboard`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`
      }
    })
      .then(response => {
        this.setState({
          summary: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  getEtaForWeek(array = [], week = false) {
    const start = week ? moment().startOf("week") : moment().startOf("day"),
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
    const { projects, allEpicTasks, history } = this.props;

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
        project.epics && allEpics.push(...project.epics);
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

        <RenderProjectCards projects={projects} summary={this.state.summary} />

        {/* <div className="projects">
          {projects && (
            <div>
              <RenderCard type="overview" data={overview} />

              {projects.map((project, key) => (
                <RenderCard type="project" key={key} data={project} />
              ))}
            </div>
          )}
        </div> */}

        <RenderInfo
          summary={this.state.summary}
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
  state => ({
    clientData: state.clientData,
    specialistData: state.specialistData,
    changeUserType: state.changeUserType,
    allEpicTasks: state.allEpicTasks
  }),
  {
    // showAllProjects,
    // showAllSpecialists,
    // showSpecialistProjects,
    // showAllEpicTasks
  }
)(RenderDashboard);
