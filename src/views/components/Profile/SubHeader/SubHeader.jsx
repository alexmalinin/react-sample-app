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

  render() {
    const { page, percents, routes } = this.props;
    const { isEditing } = this.state;

    return (
      <StyledSubHeader profileForm="true">
        <div className="progressBarsLink">
          {routes.map(({ path, label, name }, key) => (
            <SubHeaderLink
              key={name}
              url={`${path}${isEditing ? "?edit" : ""}`}
              label={label}
              noExact
            >
              {key + 1}
              <ProgressBars percents={percents[name]} />
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
