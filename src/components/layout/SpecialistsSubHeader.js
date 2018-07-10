import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import StyledSubHeaderLink from "../../styleComponents/StyledSubHeaderLink";
import ProgressBars from "../layout/ProgressBar";
import StyledSubHeader from "../../styleComponents/layout/StyledSubHeader";
import { getAllUrlParams, getUserRole } from "../../helpers/functions";
import { S_PASSIVE } from "../../constants/user";
import SubHeaderLinkWrap from "../forms/renders/SubHeaderLinkWrap";

class SubHeader extends Component {
  state = {
    isEditing: false
  };

  componentWillMount() {
    let param = getAllUrlParams().edit;
    let isEditing = param ? param : false;
    this.setState({ isEditing });
  }

  navLinks = [
    {
      url: "info",
      label: "My Profile",
      percents: this.props.percents.profilePercent
    },
    {
      url: "industry",
      label: "My Services",
      percents: this.props.percents.industryPercent
    },
    {
      url: "company",
      label: "My Company",
      percents: this.props.percents.companyPercent
    },
    {
      url: "billings",
      label: "My Billings",
      percents: this.props.percents.billingPercent
    }
  ];

  render() {
    const { page } = this.props;
    const { isEditing } = this.state;

    return (
      <StyledSubHeader profileForm="true" greenGradient>
        <div className="progressBarsLink">
          {this.navLinks.map(({ url, label, percents }, key) => (
            <SubHeaderLinkWrap
              key={key}
              url={`/profile/${url}${isEditing ? "?edit" : ""}`}
              label={label}
              noExact
            >
              {key + 1}
              <ProgressBars percents={percents} />
            </SubHeaderLinkWrap>
          ))}
        </div>
        <div>
          {!isEditing ? (
            page === "info" || page === "industry" ? null : (
              <NavLink
                exact
                className="button"
                to={
                  getUserRole() === S_PASSIVE
                    ? "/dashboard/about"
                    : "/dashboard/"
                }
              >
                <StyledSubHeaderLink className="right-link arrow" />
                Complete Later
                <span />
              </NavLink>
            )
          ) : null}
        </div>
      </StyledSubHeader>
    );
  }
}

export default withRouter(SubHeader);
