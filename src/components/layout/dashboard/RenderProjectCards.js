import React, { Component } from "react";
import moment from "moment";
import StyledDashboardCard from "../../../styleComponents/StyledDashboardCard";
import RenderProjectCard from "./RenderProjectCard";

class RenderProjectCards extends Component {
  renderOverview() {
    const { projects } = this.props;

    return (
      <StyledDashboardCard size={{ col: 2, row: 2 }} type="overview">
        <div className="titleWrapper">
          <div>
            <div className="title">Projects overview</div>
            <div className="subTitle">Status</div>
          </div>
        </div>
        <div className="content">
          {projects &&
            projects.map((project, key) => (
              <div key={key}>
                <p>{project.name}</p>
                <progress value={(key + 1) * 20} max="100" />
              </div>
            ))}
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

  render() {
    const { projects, summary } = this.props;

    return (
      <div className="projects">
        <div>
          {this.renderOverview()}

          {projects &&
            projects.map((project, index) => {
              let info = null;

              summary &&
                summary.forEach(element => {
                  if (element[project.id]) {
                    info = element[project.id];
                  }
                });

              return (
                <RenderProjectCard
                  key={index}
                  data={project}
                  summary={info}
                  getCurrentEpic={this.getCurrentEpic}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

export default RenderProjectCards;
