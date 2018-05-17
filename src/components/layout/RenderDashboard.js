import React, { Component } from "react";
import { connect } from "react-redux";

import RenderCard from "./RenderCard";
import StyledDashBoard from "../../styleComponents/StyledDashBoard";

import { showAllSpecialists } from "../../actions/actions";
import cards from "../../helpers/cardsData";
import { getUserRole } from "../../helpers/functions";
import { S_REDGUY, CUSTOMER } from "../../constans/constans";

class RenderDashboard extends Component {
  componentWillMount() {
    if (getUserRole() === CUSTOMER) {
      this.props.showAllSpecialists("red_guy");
    } else if (getUserRole() === S_REDGUY) {
      this.props.showAllSpecialists("active", "core");
    }
  }
  renderCards(type) {
    const data = cards;
    let dueCards = data.filter(item => {
      return item.type === type;
    });
    return (
      <div>
        {dueCards.map((card, index) => {
          return <RenderCard key={index} type={type} data={card} />;
        })}
      </div>
    );
  }

  render() {
    const { projects } = this.props;

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

    return (
      <StyledDashBoard>
        <div className="tasksDue">{this.renderCards("tasks_due")}</div>
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
        <div className="tasks">{this.renderCards("tasks")}</div>
      </StyledDashBoard>
    );
  }
}

export default connect(({ changeUsertype }) => ({ changeUsertype }), {
  showAllSpecialists
})(RenderDashboard);
