import React, { Component } from "react";
import { withRouter } from "react-router";

import ProgressBars from "@UI/ProgressBar";
import StyledSubHeader from "@styled/SubHeader";
import { getAllUrlParams } from "@views/utils/functions";
import SubHeaderLink from "@UI/SubHeaderLink";

class SubHeader extends Component {
  state = {
    isEditing: !!getAllUrlParams().edit
  };

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
            <SubHeaderLink
              key={key}
              url={`/profile/${url}${isEditing ? "?edit" : ""}`}
              label={label}
              noExact
            >
              {key + 1}
              <ProgressBars percents={percents} />
            </SubHeaderLink>
          ))}
        </div>
        <div>
          {/* {!isEditing ? (
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
          ) : null} */}
        </div>
      </StyledSubHeader>
    );
  }
}

export default withRouter(SubHeader);
