import React from "react";

import StyledDashboardCard from "../StyledDashboardCard";

const Overview = ({ projects }) => (
  <StyledDashboardCard size={{ col: 2, row: 2 }} type="overview">
    <div className="titleWrapper">
      <div>
        <div className="title">Projects overview</div>
        <div className="subTitle">Status</div>
      </div>
    </div>
    <div className="content">
      {Object.keys(projects).map(id => (
        <div key={projects[id].id}>
          <p>{projects[id].name}</p>
        </div>
      ))}
    </div>
  </StyledDashboardCard>
);

export default Overview;
