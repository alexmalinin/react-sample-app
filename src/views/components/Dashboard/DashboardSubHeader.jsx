import React from "react";

// import AddTaskModal from "../modals/AddTaskModal";
import SubHeaderLink from "@UI/SubHeaderLink";

import StyledSubHeader from "@styled/SubHeader";
import StyledSubHeaderLink from "@styled/SubHeaderLink";

const DashboardSubHeader = () => {
  return (
    <StyledSubHeader projects sidebarCondition dashboardSubHeader>
      <div className="left">
        <SubHeaderLink
          label="Dashboard"
          url="/dashboard/"
          className="dashboard"
        >
          <i className="fa fa-columns" />
        </SubHeaderLink>
      </div>

      <div className="right">
        {/* <AddTaskModal
          content="Add epic"
          className="dahsboard"
          trigger={
            <a className="button add-epic">
              <StyledSubHeaderLink className="right-link addButton modalTrigger" />
              <span>Add epic</span>
            </a>
          }
        /> */}

        <SubHeaderLink
          url="/dashboard/project/new"
          label="Add project"
          className="right-link dahsboard addButton"
        />
      </div>
    </StyledSubHeader>
  );
};

export default DashboardSubHeader;
