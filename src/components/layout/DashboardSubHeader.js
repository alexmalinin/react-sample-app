import React, { Component } from "react";
import { connect } from "react-redux";

import SubHeaderLinkWrap from "../forms/renders/SubHeaderLinkWrap";
import StyledSubHeader from "../../styleComponents/layout/StyledSubHeader";

import { CLIENT } from "../../constans/constans";
import AddTaskModal from "../modals/AddTaskModal";

class DashboardSubHeader extends Component {
  render() {
    return (
      <StyledSubHeader projects sidebarCondition dashboardSubHeader>
        <div>
          <SubHeaderLinkWrap
            content="Dashboard"
            url="/dashboard/"
            className="dashboard dv-button__circle active"
          >
            &nbsp;
          </SubHeaderLinkWrap>

          <SubHeaderLinkWrap
            content="The village"
            url="/dashboard/the_village"
            className="dashboard dv-button__circle"
          >
            &nbsp;
          </SubHeaderLinkWrap>
          {this.props.theVillage ? (
            <SubHeaderLinkWrap
              theVillage
              content="filter"
              url="#"
              className="filterVillage dashboard"
            />
          ) : null}
          {this.props.theVillage ? (
            <SubHeaderLinkWrap
              theVillage
              content=""
              url="#"
              className="arrowVillage dashboard"
            />
          ) : null}
        </div>
        <div>
          <AddTaskModal content="Add task" className="dahsboard" />

          <SubHeaderLinkWrap
            url="/dashboard/project/new"
            className="rightLink dahsboard addButt"
          >
            Add project
          </SubHeaderLinkWrap>
        </div>
      </StyledSubHeader>
    );
  }
}

export default connect(({ changeUserType }) => ({ changeUserType }), null)(
  DashboardSubHeader
);
