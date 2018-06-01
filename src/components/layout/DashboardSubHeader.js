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
        <div className="left">
          <SubHeaderLinkWrap
            label="Dashboard"
            url="/dashboard/"
            className="dashboard"
          >
            <i className="fa fa-columns" />
          </SubHeaderLinkWrap>

          <SubHeaderLinkWrap
            label="The village"
            url="/dashboard/the_village"
            className="dashboard"
          >
            <i className="fas fa-newspaper" />
          </SubHeaderLinkWrap>
        </div>
        <div className="right">
          {specialistData &&
            specialistData.role === S_REDGUY && (
              <AddTaskModal content="Add epic" className="dahsboard" />
            )}

          {changeUserType === CLIENT && (
            <SubHeaderLinkWrap
              url="/dashboard/project/new"
              label="Add project"
              className="rightLink dahsboard addButton"
            />
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
