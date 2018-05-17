import React, { Component } from "react";
import { connect } from "react-redux";

import SubHeaderLinkWrap from "../forms/renders/SubHeaderLinkWrap";
import StyledSubHeader from "../../styleComponents/layout/StyledSubHeader";
import AddTaskModal from "../modals/AddTaskModal";
import { CLIENT, S_REDGUY } from "../../constans/constans";

class DashboardSubHeader extends Component {
  render() {
    const { theVillage, specialistData, changeUserType } = this.props;

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
          {theVillage ? (
            <SubHeaderLinkWrap
              theVillage
              content="filter"
              url="#"
              className="filterVillage dashboard"
            />
          ) : null}
          {theVillage ? (
            <SubHeaderLinkWrap
              theVillage
              content=""
              url="#"
              className="arrowVillage dashboard"
            />
          ) : null}
        </div>
        <div>
          {specialistData &&
            specialistData.role === S_REDGUY && (
              <AddTaskModal content="Add epic" className="dahsboard" />
            )}

          {changeUserType === CLIENT && (
            <SubHeaderLinkWrap
              url="/dashboard/project/new"
              className="rightLink dahsboard addButt"
            >
              Add project
            </SubHeaderLinkWrap>
          )}
        </div>
      </StyledSubHeader>
    );
  }
}

export default connect(
  ({ changeUserType, specialistData }) => ({ changeUserType, specialistData }),
  null
)(DashboardSubHeader);
