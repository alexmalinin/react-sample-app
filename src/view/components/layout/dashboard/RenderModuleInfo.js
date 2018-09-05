import React, { Component } from "react";
import axios from "axios";
import { PORT } from "utilities/constants";
import ProgressBars from "../ProgressBar";
import StyledDashboardCard from "../../../styleComponents/StyledDashboardCard";

class RenderModuleInfo extends Component {
  state = {
    all_tasks: null,
    completed_tasks: null
  };

  async componentDidMount() {
    const {
      epic: { id, project_id }
    } = this.props;

    await axios({
      method: "GET",
      url: `${PORT}/api/v1/projects/${project_id}/epics/${id}/summary`,
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt_token")}` }
    })
      .then(response => {
        this.getSummary(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  getSummary = ({ all_tasks, completed_tasks }) => {
    this.setState({
      all_tasks,
      completed_tasks
    });
  };

  render() {
    const {
      epic: { name, project_name }
    } = this.props;

    const { all_tasks, completed_tasks } = this.state,
      percents = Math.round(completed_tasks / all_tasks * 100) || 0;

    return (
      <StyledDashboardCard
        size={{ col: 1, row: 1 }}
        background="#00ffc0"
        type="module_info"
      >
        <div className="titleWrapper">
          <div className="project">{project_name || "Unnamed"}</div>
          <div className="subTitle">{name ? `Module: ${name}` : null}</div>
        </div>

        <div className="projectContainer centered">
          <div className="progress">
            <div className="progressItem">
              <div className="progressBar">{all_tasks || 0}</div>
              <ProgressBars
                percents={percents}
                module="true"
                strokeColor="#4d4d4d"
              />
              <span>Epics</span>
            </div>
          </div>
        </div>
      </StyledDashboardCard>
    );
  }
}

export default RenderModuleInfo;
