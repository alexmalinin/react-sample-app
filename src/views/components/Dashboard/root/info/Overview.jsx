import React from "react";

import StyledDashboardCard from "./StyledDashboardCard";

const Overview = () => (
  <StyledDashboardCard size={{ col: 2, row: 2 }} type="overview">
    <div className="titleWrapper">
      <div>
        <div className="title">Projects overview</div>
        <div className="subTitle">Status</div>
      </div>
    </div>
    <div className="content">
      {/* {projects &&
		projects.map((project, key) => (
			<div key={key}>
				<p>{project.name}</p>
			</div>
		))} */}
    </div>
  </StyledDashboardCard>
);

export default Overview;
